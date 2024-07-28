<template>
  <div class="main-container">
    <h1>Welcome to Call2Action</h1>
    <nav>
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
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
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
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #2D4373;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
}

button:hover {
  background-color: #3B5998;
}

nav ul li:last-child {
  margin-right: 0;
}
</style>
