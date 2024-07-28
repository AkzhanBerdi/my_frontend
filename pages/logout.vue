<template>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async logout() {
        try {
          await this.$axios.post('http://localhost:8000/api/users/logout/');
          localStorage.removeItem('authToken'); // Remove auth token
          this.$router.push('/');
        } catch (error) {
          console.error('Logout error:', error.response.data);
        }
      }
    }
  }
  </script>
  