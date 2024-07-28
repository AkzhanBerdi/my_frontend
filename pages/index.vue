<template>
  <div>
    <h1>Main Page</h1>
    <nav>
      <ul>
        <li v-if="!isLoggedIn"><nuxt-link to="/register">Register</nuxt-link></li>
        <li v-if="!isLoggedIn"><nuxt-link to="/login">Login</nuxt-link></li>
        <li v-if="isLoggedIn"><nuxt-link to="/" @click.native="logout">Logout</nuxt-link></li>
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
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    }
  }
}
</script>
