<template>
  <v-row class="justify-center my-auto">
    <v-col cols="12" md="4">
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
            prepend-icon="mdi-email"
            color="dark"
            :rules="emailRules"
            v-model="personelData.email"
            label="E-mail"
            required
            @keyup.enter="login()"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            color="dark"
            v-model="personelData.password"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            hint="At least 8 characters"
            @click:append="show1 = !show1"
            @keyup.enter="login()"
          ></v-text-field>
          <v-btn
            color="grey lighten-2"
            :disabled="!valid"
            @click="login()"
            class="black--text float-right mb-2"
            elevation="3"
          >
            Login
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" class="text-center mt-6">
      <v-btn outlined rounded to="register">Create New Account</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      personelData: {
        email: "",
        password: "",
      },
      valid: true,
      show1: "",
      rules: {
        required: (value) => !!value || "Password is required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.personelData);
    },
  },
};
</script>
