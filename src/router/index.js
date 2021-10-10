import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/components/Dashboard/Dashboard.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/kullanicilar",
    name: "Kullanicilar",
    component: () => import("@/components/Kullanicilar/Kullanicilar.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/urunler",
    name: "Urunler",
    component: () => import("@/components/Urunler/Urunler.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/satislar",
    name: "Satislar",
    component: () => import("@/components/Satislar/Satislar.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/musteriler",
    name: "Musteriler",
    component: () => import("@/components/Musteriler/Musteriler.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
