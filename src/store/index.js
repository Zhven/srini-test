import { createStore } from "vuex";
import { auth } from "./auth.module";
import { country } from "./country.module";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    country,
  },
});

export default store;
