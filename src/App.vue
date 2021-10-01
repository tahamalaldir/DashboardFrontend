<template>
  <div class="container-fluid">
    <div class="row">
      <side-nav></side-nav>
      <router-view class="p-0 offset-2" />
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/Shared/SideNav";
export default {
  name: "App",
  components: { SideNav },
};
</script>

<style></style>
