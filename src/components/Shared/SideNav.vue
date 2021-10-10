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
    <v-spacer></v-spacer>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn outlined block
          ><v-icon left>mdi-logout-variant </v-icon> Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/dashboard" },
        {
          title: "Kullanıcılar",
          icon: "mdi-account-group",
          link: "/kullanicilar",
        },
        { title: "Ürünler", icon: "mdi-shopping", link: "/urunler" },
        { title: "Satışlar", icon: "mdi-cash-multiple", link: "/satislar" },
        {
          title: "Müşteriler",
          icon: "mdi-account-cash",
          link: "/musteriler",
        },
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
