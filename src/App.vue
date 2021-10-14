<template>
  <component :is="layout"></component>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default {
  components: { DefaultLayout },
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DefaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  created() {
    this.$store.dispatch("initAuth");
  },
};
</script>
