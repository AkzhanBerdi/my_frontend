<template>
  <div class="main-container">
    <nav class="sidebar">
      <h1>Welcome to Call2Action</h1>
      <ul>
        <li v-if="!$store.getters.isLoggedIn">
          <button @click="$router.push('/login')">Login</button>
        </li>
        <li v-if="!$store.getters.isLoggedIn">
          <button @click="$router.push('/register')">Sign-Up</button>
        </li>
        <li v-if="$store.getters.isLoggedIn">
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
    <div class="content" v-if="$store.getters.isLoggedIn">
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
  methods: {
    async submitForm() {
      if (!this.phoneNumber) {
        alert('Please enter a phone number');
        return;
      }

      this.isLoading = true;
      try {
        console.log('Initiating call to:', this.phoneNumber); // Debug log
        await this.$store.dispatch('initiateCall', this.phoneNumber);
        alert('Call initiated successfully');
      } catch (error) {
        console.error('Call initiation error:', error);
        alert('Failed to initiate call. Please try again.');
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        alert('Logout failed. Please try again.');
      }
    }
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
  position: relative;
  z-index: 10;
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
