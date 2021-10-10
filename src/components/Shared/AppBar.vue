<template>
  <v-app-bar absolute app flat height="60">
    <v-app-bar-nav-icon @click.stop="changeDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title v-text="$route.name" />
    <v-spacer></v-spacer>
    <p class="my-auto mx-2">Hoşgeldin,Taha</p>
    <v-btn icon @click="toggleDarkMode()"
      ><v-icon>mdi-brightness-4</v-icon></v-btn
    >
  </v-app-bar>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["changeDrawer"]),
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
