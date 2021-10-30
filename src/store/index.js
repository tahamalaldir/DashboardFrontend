import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
import Swal from "sweetalert2";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mini: false,
    users: {},
    products: {},
    customers: {},
    sales: {},
    userData: {},
    token: "",
  },
  mutations: {
    changeDrawer(state) {
      if (state.mini === false) {
        state.mini = true;
      } else if (state.mini === true) {
        state.mini = false;
      }
    },
    setUserData(state, data) {
      state.userData = data;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
    setProducts(state, data) {
      state.products = data;
    },
    setCustomers(state, data) {
      state.customers = data;
    },
    setSales(state, data) {
      state.sales = data;
    },
    setUsers(state, data) {
      state.users = data;
    },
  },
  actions: {
    initAuth({ commit, dispatch }) {
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        dispatch("getAllData");
        router.push("/dashboard");
      } else {
        router.push("/login");
        return false;
      }
    },
    login({ commit, dispatch }, data) {
      return axios
        .post("https://localhost:44397/api/auth/login", data)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.id);
            commit("setToken", res.data.token);
            commit("setUserData", res.data);
            dispatch("getAllData");
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Giriş başarılı",
            });
            router.push("/");
          }
        })
        .catch(() =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Kullanıcı adı veya şifre hatalı",
          })
        );
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Çıkış başarılı",
      });
      router.push("/login");
    },
    alert() {
      Swal.fire({
        icon: "success",
        text: "Işleminiz başarıyla tamamlanmıştır.",
      });
    },
    getAllData({ dispatch }) {
      dispatch("getCustomers");
      dispatch("getProducts");
      dispatch("getSales");
      dispatch("getUsers");
      dispatch("getById");
    },
    getById({ commit, state }) {
      let id = localStorage.getItem("userId");
      return axios
        .get(`https://localhost:44397/api/users/getbyid?userId=${id}`, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setUserData", res.data);
        });
    },
    getUsers({ commit, state }) {
      axios
        .get("https://localhost:44397/api/users/getall", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setUsers", res.data);
        });
    },
    getProducts({ commit, state }) {
      axios
        .get("https://localhost:44397/api/products/getall", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setProducts", res.data);
        });
    },
    getCustomers({ commit, state }) {
      axios
        .get("https://localhost:44397/api/customers/getall", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setCustomers", res.data);
        });
    },
    getSales({ commit, state }) {
      axios
        .get("https://localhost:44397/api/sales/getall", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setSales", res.data);
        });
    },
  },
  modules: {},
  getters: {
    isAuthenticated: (state) => {
      return state.token !== "";
    },
    getToken: (state) => {
      return state.token;
    },
    getMini: (state) => {
      return state.mini;
    },
    getProducts: (state) => {
      return state.products;
    },
    getSales: (state) => {
      return state.sales;
    },
    getUsers: (state) => {
      return state.users;
    },
    getCustomers: (state) => {
      return state.customers;
    },
    getUserData: (state) => {
      return state.userData;
    },
  },
});
