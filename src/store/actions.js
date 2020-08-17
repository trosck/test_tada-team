export default {
  loginUser({ commit }, username) {
    commit("setUsername", username)
    commit("setLogin", true)
  },
  resolveMessageData({ commit, getters }, event) {
    const username = getters.username
    try {
      const data = JSON.parse(event.data)

      if (data.typing) {
        
        return;
      }

      data._type = data.name ? "message" : "invited"
      data._id = Date().now
      data._self = data.name === username
      
      commit("addMessage", data)
    }
    catch(error) {
      console.error(error)
    }
  },
  initWebSocket({ commit, dispatch, getters }) {
    
    commit("setLoading", true)
    
    const username = getters.username
    const badData = JSON.stringify({
      data: { text: "Connection is closed" } 
    })
    
    try {
      const ws = new WebSocket(`${process.env.VUE_APP_CHAT_WS_ADRESS}/ws?name=${username}`)
      ws.onmessage = event => dispatch("resolveMessageData", event)
      ws.onopen = ( ) => commit("setLoading", false)
      ws.onclose = ( ) => dispatch("resolveMessageData", badData)
      ws.onerror = ( ) => dispatch("resolveMessageData", badData)

      commit("setSocket", ws)
    }
    catch(error) {
      console.error(error)
      commit("setLoading", false)
    }
  },
  sendMessage({ state }, text) {
    state.socket.send(
      JSON.stringify({ text }) 
    )
  },
}