import Vue from "vue";
import Vuex from "vuex";

import * as api from "../api";

Vue.use(Vuex);

const LOADING = "ROOT_LOADING",
  LOADED = "ROOT_LOADED",
  SET_USER = "SET_USER",
  SET_FRIENDS = "SET_FRIENDS";

export default new Vuex.Store({
  state: {
    loading: false,
    user: JSON.parse(localStorage.getItem("currentUser")) ?? null,
    friends: []
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
    },
    [SET_FRIENDS](state, friends) {
      state.friends = friends || [];
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
    },
    async loadFriends({ commit }) {
      commit(LOADING);
      const { users: friends } = await api.getUsers();
      commit(SET_FRIENDS, friends);
      commit(LOADED);
    }
  }
});
