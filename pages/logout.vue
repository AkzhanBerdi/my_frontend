<template>
  <div>
    <h2>Logging out...</h2>
  </div>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
      this.$router.push('/');
    }
  }
}
</script>