<template>
  <div class="main-container">
    <nav class="sidebar">
      <h1>Welcome to Call2Action</h1>
      <ul>
        <li v-if="!isLoggedIn">
          <button @click="goToLogin">Login</button>
        </li>
        <li v-if="!isLoggedIn">
          <button @click="goToRegister">Sign-Up</button>
        </li>
        <li v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
    <div class="content" v-if="isLoggedIn">
      <h2>Initiate a Call</h2>
      <form @submit.prevent="submitForm">
        <input v-model="phoneNumber" placeholder="Enter phone number" required />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Initiating...' : 'Initiate Call' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      isLoading: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    async submitForm() {
    try {
      await this.$store.dispatch('initiateCall', this.phoneNumber);
      alert('Call initiated successfully');
    } catch (error) {
      alert('Failed to initiate call. Please try again.');
    }
  }
},
    async fetchCsrfToken() {
      try {
        const response = await this.$axios.get('/api/users/csrf-token/');
        return response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    }
  }

</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #2D4373;
  padding: 20px;
  width: 250px;
  color: white;
}

.sidebar h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar button {
  padding: 10px 20px;
  font-size: 16px;
  color: #2D4373;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.sidebar button:hover {
  background-color: #f0f0f0;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.content h2 {
  margin-bottom: 20px;
}

.content form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content input {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 300px;
}

.content button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #2D4373;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content button:hover {
  background-color: #3B5998;
}
</style>
