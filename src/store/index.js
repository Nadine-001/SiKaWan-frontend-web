// import { createApp } from "vue";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// app.use(Vuex);

export const store = createStore({
  modules: {},
  plugins: [createPersistedState()],
  state: {
    token: null,
    userProfile: null,
  },
  actions: {
    clearData({ commit }) {
      commit("setToken", null), commit("setUserProfile", null);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    role: (state) => state.userProfile.role,
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
});
