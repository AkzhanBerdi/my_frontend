// store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      isLoggedIn: !!localStorage.getItem('authToken')
    },
    mutations: {
      setLoginState(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
      }
    },
    actions: {
      async login({ commit }, credentials) {
        try {
          const response = await this.$axios.post('http://localhost:8000/api/users/login/', credentials);
          localStorage.setItem('authToken', response.data.token); // Adjust according to your API response
          commit('setLoginState', true);
        } catch (error) {
          console.error('Login error:', error.response.data);
          throw error;
        }
      },
      async logout({ commit }) {
        try {
          await this.$axios.post('http://localhost:8000/api/users/logout/');
          localStorage.removeItem('authToken');
          commit('setLoginState', false);
        } catch (error) {
          console.error('Logout error:', error.response.data);
          throw error;
        }
      }
    }
  });
};

export default createStore;
