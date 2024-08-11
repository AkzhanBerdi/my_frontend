import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      isLoggedIn: !!localStorage.getItem('authToken'),
      csrfToken: null
    }),
    mutations: {
      setLoginState(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
      },
      SET_CSRF_TOKEN(state, token) {
        state.csrfToken = token;
      }
    },
    actions: {
      async nuxtServerInit({ commit }, { $axios }) {
        try {
          const response = await $axios.get('/api/users/csrf-token/');
          commit('SET_CSRF_TOKEN', response.data.csrfToken);
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      },
      async login({ commit }, credentials) {
        try {
          const response = await this.$axios.post('http://localhost:8000/api/users/login/', credentials);
          localStorage.setItem('authToken', response.data.token);
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
      },
      async initiateCall({ state }, phoneNumber) {
        try {
          const response = await this.$axios.post('/api/demo/initiate-call/', 
            { phone_number: phoneNumber },
            {
              headers: {
                'X-CSRFToken': state.csrfToken
              }
            }
          );
          return response.data;
        } catch (error) {
          console.error('Call initiation error:', error.response?.data || error.message);
          throw error;
        }
      }
    }
  });
};

export default createStore;