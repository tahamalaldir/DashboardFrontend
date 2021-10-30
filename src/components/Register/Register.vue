<template>
  <v-row class="justify-center pt-16 mt-16">
    <v-col cols="12" md="5">
      <v-card
        elevation="16"
        color="grey darken-4"
        dark
        outlined
        class="pa-4"
        height="100%"
      >
        <v-form ref="form" v-model="valid">
          <v-text-field
            prepend-icon="mdi-account"
            :rules="nameRules"
            color="dark"
            v-model="personelData.name"
            label="Adı"
            required
            @keyup.enter="register()"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account"
            color="dark"
            :rules="lastnameRules"
            v-model="personelData.lastname"
            label="Soyadı"
            required
            @keyup.enter="register()"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-email"
            color="dark"
            :rules="emailRules"
            v-model="personelData.email"
            label="E-mail"
            required
            @keyup.enter="register()"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            color="dark"
            v-model="personelData.password"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Parola"
            required
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            hint="At least 8 characters"
            @click:append="show = !show"
            @keyup.enter="register()"
          ></v-text-field>
          <v-btn
            color="grey lighten-2"
            :disabled="!valid"
            @click="register()"
            class="black--text float-right mb-2"
            elevation="3"
          >
            Submit
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" class="text-center"
      ><v-btn outlined rounded class="mt-6" to="login"
        >Do you have an account?</v-btn
      ></v-col
    >
  </v-row>
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      show: "",
      personelData: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        sex: "male",
      },
      rules: {
        required: (value) => !!value || "Password is required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      nameRules: [(v) => !!v || "Name is required"],
      lastnameRules: [(v) => !!v || "Lastname is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      roles: ["Admin", "User"],
    };
  },
  methods: {
    register() {
      if (this.valid) {
        let data = {
          firstname: this.personelData.name,
          lastname: this.personelData.lastname,
          password: this.personelData.password,
          email: this.personelData.email,
        };
        axios
          .post("https://localhost:44397/api/auth/register", data)

          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$swal.fire({
                icon: "success",
                text: res.data,
              });
              this.$router.push("/login");
            }
          })
          .catch(() =>
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Kullanıcı mevcut veya başka bir hata oluştu",
            })
          );
      }
    },
  },
};
</script>
<style scoped></style>
