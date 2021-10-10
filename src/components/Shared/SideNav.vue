<template>
  <v-navigation-drawer
    color="grey darken-4"
    dark
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
        { title: "Kullanıcılar", icon: "", link: "/kullanicilar" },
        { title: "Ürünler", icon: "", link: "/urunler" },
        { title: "Satışlar", icon: "", link: "/satislar" },
        { title: "Müşteriler", icon: "", link: "/musteriler" },
      ],
    };
  },
  computed: {
    mini: {
      get() {
        return this.$store.getters.getMini;
      },
      set() {
        this.$store.commit("changeDrawer");
      },
    },
  },
};
</script>
