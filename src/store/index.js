import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
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
      axios.post("http://localhost:8080/api/auth/login", data).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.id);
          commit("setToken", res.data.token);
          commit("setUserData", res.data);
          dispatch("getAllData");
          alert("Giriş Başarılı...");
          router.push("/");
        } else {
          alert("Giriş Başarısız...");
        }
      });
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      alert("Çıkış başarılı...");
      router.push("/login");
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
        .get(`http://localhost:8080/api/users/${id}`, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setUserData", res.data);
        });
    },
    getUsers({ commit, state }) {
      axios
        .get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setUsers", res.data);
        });
    },
    getProducts({ commit, state }) {
      axios
        .get("http://localhost:8080/api/products", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setProducts", res.data);
        });
    },
    getCustomers({ commit, state }) {
      axios
        .get("http://localhost:8080/api/customers", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          commit("setCustomers", res.data);
        });
    },
    getSales({ commit, state }) {
      axios
        .get("http://localhost:8080/api/sales", {
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
