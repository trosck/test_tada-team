export default {
  setUsername(state, username) {
    state.username = username
  },
  setLogin(state, value) {
    state.isLogin = value
  },
  addMessage(state, message) {
    state.chatList.push(message)
  },
  setSocket(state, socket) {
    state.socket = socket
  },
  setLoading(state, value) {
    state.loading = value
  },
}