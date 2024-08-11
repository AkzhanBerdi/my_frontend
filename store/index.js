import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      isLoggedIn: false,
      csrfToken: null,
      user: null,
      token: null
    }),
    getters: {
      isLoggedIn: state => !!state.token
    },
    mutations: {
      setLoginState(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn;
      },
      SET_CSRF_TOKEN(state, token) {
        state.csrfToken = token;
      },
      SET_USER(state, user) {
        state.user = user;
      },
      SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
      },
      CLEAR_TOKEN(state) {
        state.token = null;
        localStorage.removeItem('token');
      }
    },
    actions: {
      async nuxtServerInit({ commit, dispatch }) {
        try {
          const response = await this.$axios.get('/api/users/csrf-token/');
          commit('SET_CSRF_TOKEN', response.data.csrfToken);
          const token = localStorage.getItem('token');
          if (token) {
            commit('SET_TOKEN', token);
            await dispatch('checkAuth');
          }
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      },
      async checkAuth({ commit, state }) {
        if (!state.token) return;
        try {
          const response = await this.$axios.get('/api/users/me/', {
            headers: {
              'Authorization': `Token ${state.token}`
            }
          });
          commit('SET_USER', response.data);
          commit('setLoginState', true);
        } catch (error) {
          commit('SET_USER', null);
          commit('setLoginState', false);
          commit('CLEAR_TOKEN');
        }
      },
      async login({ commit }, credentials) {
        try {
          const response = await this.$axios.post('/api/users/login/', credentials);
          commit('SET_TOKEN', response.data.token);
          commit('setLoginState', true);
          await this.dispatch('checkAuth');
          return response;
        } catch (error) {
          console.error('Login error:', error.response?.data);
          throw error;
        }
      },
      async logout({ commit }) {
        try {
          await this.$axios.post('/api/users/logout/');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          commit('CLEAR_TOKEN');
          commit('SET_USER', null);
          commit('setLoginState', false);
        }
      },
      async register(_, userData) {
        try {
          await this.$axios.post('/api/users/register/', userData);
        } catch (error) {
          console.error('Registration error:', error.response?.data);
          throw error;
        }
      },
      async initiateCall({ state }, phoneNumber) {
        try {
          const response = await this.$axios.post('/api/demo/initiate-call/', 
            { to_number: phoneNumber },  // Make sure this matches your backend expectation
            {
              headers: {
                'X-CSRFToken': state.csrfToken,
                'Authorization': `Token ${state.token}`
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