<template>
  <div
    class="container home-page"
    ref=container
  >
    <v-card
      tile
      v-for="message in chatListAscSorted"
      :key="message._id"
    >
      <v-card-subtitle>
        {{ message.username }}
      </v-card-subtitle>

      <v-card-text>
        {{ message.value }}
      </v-card-text>
    </v-card>

    <v-bottom-navigation
      color="white"
      class="bottom-navigation"
    >
      <v-text-field
        autofocus
        v-model="inputMessage"
        @keyup.enter="sendChatMessage"
      />

      <v-btn
        @click="sendChatMessage"
      >
        Send
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters, mapActions, } from "vuex"
export default {
  name: "Home",

  data() {
    return {
      inputMessage: ''
    }
  },

  watch: {
    chatListAscSorted() {
      const el = this.$refs.container

      console.log(el.scrollHeight - el.scrollTop - el.offsetHeight)
      if (!el) return
      if (el.scrollHeight - el.scrollTop - el.offsetHeight > 200) return

      this.$nextTick(() => {
        el.scrollTo(0, el.scrollHeight)
      })
    }
  },

  async created() {
    await this.initWSConnection()
    await this.loadAllMessages()
  },

  computed: {
    ...mapGetters([
      'chatListAscSorted',
      'username',
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'resolveMessageData',
      'sendMessage',
      'initWSConnection',
      'loadAllMessages'
    ]),

    sendChatMessage() {
      const value = this.inputMessage
      if (value.length) {
        this.sendMessage({ value, type: 'push' })
        this.inputMessage = ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.home-page {
  height: 85vh;
  overflow: auto;
  position: relative;

  .bottom-navigation {
    position: sticky;
    bottom: 0;
  }
}
</style>
