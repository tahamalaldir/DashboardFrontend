<template>
  <v-app-bar absolute app color="grey lighten-2" flat height="75">
    <v-app-bar-nav-icon @click.stop="changeDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title v-text="$route.name" />
    <v-spacer></v-spacer>
    <p class="my-auto mx-2">Hoşgeldin,Taha</p>
    <v-btn text><v-icon left>mdi-logout-variant </v-icon>Log Out </v-btn>
  </v-app-bar>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["changeDrawer"]),
  },
};
</script>
