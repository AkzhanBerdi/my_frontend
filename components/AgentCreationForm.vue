<template>
  <div class="agent-creation-form">
    <h2>Create New Retell Agent</h2>
    <form @submit.prevent="createAgent">
      <div>
        <label for="name">Name:</label>
        <input v-model="agent.name" id="name" required>
      </div>
      <div>
        <label for="accent">Accent:</label>
        <input v-model="agent.accent" id="accent" required>
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select v-model="agent.gender" id="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label for="speechStyle">Speech Style:</label>
        <input v-model="agent.speech_style" id="speechStyle" required>
      </div>
      <button type="submit">Create Agent</button>
    </form>
    <div v-if="message" :class="{ 'success': isSuccess, 'error': !isSuccess }">
      {{ message }}
    </div>
    <div v-if="createdAgent">
      <h3>Created Agent Details:</h3>
      <pre>{{ JSON.stringify(createdAgent, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentCreationForm',
  data() {
    return {
      agent: {
        name: '',
        accent: '',
        gender: '',
        speech_style: '',
      },
      message: '',
      isSuccess: false,
      createdAgent: null,
    };
  },
  methods: {
    async createAgent() {
      try {
        const response = await this.$axios.post('/api/demo/create-agent/', this.agent);
        
        this.isSuccess = true;
        this.message = response.data.message || 'Agent created successfully';
        this.createdAgent = response.data.agent_data;
        
        // Reset form
        this.agent = { name: '', accent: '', gender: '', speech_style: '' };
        
        // Emit event to parent component
        this.$emit('agent-created', this.createdAgent);
      } catch (error) {
        this.isSuccess = false;
        if (error.response) {
          this.message = error.response.data.error || 'An error occurred while creating the agent';
        } else if (error.request) {
          this.message = 'No response received from the server. Please check your internet connection.';
        } else {
          this.message = 'An unexpected error occurred. Please try again later.';
        }
        console.error('Error creating agent:', error);
      }
    },
  },
};
</script>

<style scoped>
.agent-creation-form {
  max-width: 500px;
  margin: 0 auto;
}
.success {
  color: green;
}
.error {
  color: red;
}
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>