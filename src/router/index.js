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
  },
  {
    path: "/kullanicilar",
    name: "Kullanicilar",
    component: () => import("@/components/Kullanicilar/Kullanicilar.vue"),
  },
  {
    path: "/urunler",
    name: "Urunler",
    component: () => import("@/components/Urunler/Urunler.vue"),
  },
  {
    path: "/satislar",
    name: "Satislar",
    component: () => import("@/components/Satislar/Satislar.vue"),
  },
  {
    path: "/musteriler",
    name: "Musteriler",
    component: () => import("@/components/Musteriler/Musteriler.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
