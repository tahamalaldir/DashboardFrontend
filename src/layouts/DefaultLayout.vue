<template>
  <v-app>
    <side-nav />
    <app-bar />
    <v-main class="grey lighten-2">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideNav from "@/components/Shared/SideNav.vue";
import AppBar from "@/components/Shared/AppBar.vue";
export default {
  components: { SideNav, AppBar },
  name: "App",
};
</script>
