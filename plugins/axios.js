export default function ({ $axios, store }) {
    $axios.onRequest(config => {
      const token = store.state.csrfToken
      if (token) {
        config.headers.common['X-CSRFToken'] = token
      }
    })
  }