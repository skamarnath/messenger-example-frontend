import Vue from "vue";
import Vuex from "vuex";

import * as api from "../api";

Vue.use(Vuex);

const LOADING = "ROOT_LOADING",
  LOADED = "ROOT_LOADED",
  SET_USER = "SET_USER";

export default new Vuex.Store({
  state: {
    loading: false,
    user: JSON.parse(localStorage.getItem("currentUser")) ?? null
  },
  mutations: {
    [LOADING](state) {
      state.loading = true;
    },
    [LOADED](state) {
      state.loading = false;
    },
    [SET_USER](state, user) {
      if (user != null) {
        state.user = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        state.user = null;
        localStorage.removeItem("currentUser");
      }
    }
  },
  actions: {
    async login({ commit }, { nickname, password }) {
      commit(LOADING);
      const user = await api.login(nickname, password);
      commit(SET_USER, user);
      commit(LOADED);
    },
    async signUp({ commit }, { nickname, password }) {
      commit(LOADING);
      const user = await api.signUp(nickname, password);
      commit(SET_USER, user);
      commit(LOADED);
    },
    async logout({ commit }) {
      commit(LOADING);
      commit(SET_USER, null);
      commit(LOADED);
    }
  }
});
