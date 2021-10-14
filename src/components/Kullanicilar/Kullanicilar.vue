<template>
  <v-row>
    <v-col class="mx-auto" cols="10">
      <template>
        <v-simple-table fixed-header height="450px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Adı</th>
                <th class="text-left">Soyadı</th>
                <th class="text-left">E-mail</th>
                <th class="text-left">Rol</th>
                <th class="text-left">Onaylı mı?</th>
                <th class="text-center"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role.name }}</td>
                <td>{{ user.isApproved }}</td>
                <td>
                  <v-btn outlined color="error" @click="userDelete(user.id)"
                    >Sil</v-btn
                  >
                </td>
                <td>
                  <v-btn outlined color="warning" @click="userUpdate(user.id)"
                    >Güncelle</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template></v-col
    >
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "Kullanicilar",
  components: {},
  data() {
    return {};
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    users: {
      get() {
        return this.$store.getters.getUsers;
      },
    },
    token: {
      get() {
        return this.$store.getters.getToken;
      },
    },
  },
  methods: {
    userDelete(id) {
      axios
        .delete(`http://localhost:8080/api/users/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then(() => {
          this.$store.dispatch("getUsers");
        });
    },
    userUpdate(id) {
      axios
        .get(`http://localhost:8080/api/users/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => {
          let userData = {
            id: res.data.id,
            name: res.data.name,
            lastname: res.data.lastname,
            email: res.data.email,
            isApproved: res.data.isApproved,
            role: res.data.role,
          };
          this.$router.push({
            name: "Kullanıcılar / Kullanıcı Detay",
            params: { userId: id, userData: userData },
          });
        });
    },
  },
};
</script>
