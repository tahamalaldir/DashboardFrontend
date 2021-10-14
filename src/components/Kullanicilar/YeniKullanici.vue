<template>
  <v-col cols="8" class="mx-auto">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        color="dark"
        v-model="userData.name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field
      ><v-text-field
        color="dark"
        v-model="userData.lastname"
        :rules="nameRules"
        label="Lastname"
        required
      ></v-text-field>

      <v-text-field
        color="dark"
        v-model="userData.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-if="this.$store.state.userData.role.id === 3"
        color="dark"
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Role is required']"
        label="Role"
        required
      ></v-select>

      <v-checkbox
        color="dark"
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Kabul ediyor musun?"
        required
      ></v-checkbox>

      <v-btn color="dark" dark class="mr-4" @click="validate()"> Kaydet </v-btn>

      <v-btn color="dark" outlined class="mr-4" @click="reset"> Çıkış </v-btn>
    </v-form></v-col
  >
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Super Admin", "Admin", "User"],
    checkbox: false,
    userData: {
      name: null,
      lastname: null,
      email: null,
      role: null,
    },
  }),
  created() {
    if (this.getUserData) {
      this.userData = this.getUserData;
    }
  },
  computed: {
    getUserData: {
      get() {
        return this.$route.params.userData;
      },
    },
  },

  methods: {
    validate() {
      if (this.valid) {
        let roleN = 2;
        if (this.select === "Admin") {
          roleN = 1;
        } else if (this.select === "User") {
          roleN = 2;
        } else if (this.select === "Super Admin") {
          roleN = 3;
        }
        let data = {
          id: this.userData.id,
          name: this.userData.name,
          lastname: this.userData.lastname,
          email: this.userData.email,
          isApproved: true,
          roleId: roleN,
        };
        axios
          .put(`http://localhost:8080/api/users/${this.userData.id}`, data, {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          })
          .then(() => {
            this.$store.dispatch("getUsers");
            this.$router.push("/kullanicilar");
          });
      }
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
      this.$router.push("/kullanicilar");
    },
  },
};
</script>
