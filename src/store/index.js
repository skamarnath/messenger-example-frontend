import Vue from "vue";
import Vuex from "vuex";

import * as api from "../api";

Vue.use(Vuex);

const LOADING = "ROOT_LOADING",
  LOADED = "ROOT_LOADED",
  SET_USER = "SET_USER",
  SET_FRIENDS = "SET_FRIENDS",
  SET_MESSAGES = "SET_MESSAGES",
  SET_CURRENT_FRIEND = "SET_CURRENT_FRIEND",
  CLEAR_MESSAGES = "CLEAR_MESSAGES";

export default new Vuex.Store({
  state: {
    loading: false,
    user: JSON.parse(localStorage.getItem("currentUser")) ?? null,
    friends: [],
    messages: null,
    currentFriend: null
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
    },
    [SET_MESSAGES](state, messages) {
      state.messages = messages;
    },
    [CLEAR_MESSAGES](state, messages) {
      state.messages = null;
    },
    [SET_CURRENT_FRIEND](state, currentFriend) {
      state.currentFriend = currentFriend;
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
    },
    async loadMessages({ commit }, currentFriend) {
      commit(CLEAR_MESSAGES);
      commit(SET_CURRENT_FRIEND, currentFriend);
      commit(LOADING);
      const { messages } = await api.getMessages(currentFriend.id);
      commit(SET_MESSAGES, messages);
      commit(LOADED);
    },
    addMessage({ commit, state }, { from: fromId, to: toId, message }) {
      if (fromId == state.currentFriend.id || toId == state.currentFriend.id) {
        commit(SET_MESSAGES, [
          ...state.messages,
          {
            id: Math.random()
              .toString(36)
              .substring(7),
            fromId,
            toId,
            message
          }
        ]);
      }
    }
  }
});
