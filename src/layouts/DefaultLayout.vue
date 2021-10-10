<template>
  <v-app>
    <side-nav />
    <app-bar />
    <v-main>
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
