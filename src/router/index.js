import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

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
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/kullanicilar",
    component: () => import("@/components/Kullanicilar/Index.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
      {
        path: "",
        name: "Kullanıcılar",
        component: () => import("@/components/Kullanicilar/Kullanicilar.vue"),
        meta: {
          layout: "DefaultLayout",
        },
      },
      {
        path: "yenikullanici",
        name: "Kullanıcılar / Yeni Kullanıcı",
        component: () => import("@/components/Kullanicilar/YeniKullanici.vue"),
        meta: {
          layout: "DefaultLayout",
        },
      },
      {
        path: "kullanicidetay/:userId",
        name: "Kullanıcılar / Kullanıcı Detay",
        component: () => import("@/components/Kullanicilar/YeniKullanici.vue"),
        meta: {
          layout: "DefaultLayout",
        },
      },
    ],
  },
  {
    path: "/urunler",
    name: "Ürünler",
    component: () => import("@/components/Urunler/Urunler.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/satislar",
    name: "Satışlar",
    component: () => import("@/components/Satislar/Satislar.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/musteriler",
    name: "Müşteriler",
    component: () => import("@/components/Musteriler/Musteriler.vue"),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/Login/Login.vue"),
    beforeEnter(to, from, next) {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
    meta: {
      layout: "AuthLayout",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/components/Register/Register.vue"),
    beforeEnter(to, from, next) {
      if (!store.getters.isAuthenticated) {
        next();
      } else {
        next("/");
      }
    },
    meta: {
      layout: "AuthLayout",
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
