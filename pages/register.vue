<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async register() {
      try {
        await this.$axios.post('register/', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        // Optionally, display an error message to the user
      }
    }
  }
}
</script>
