<template>
  <div
    class="container home-page"
    ref=container
  >
    <v-list>
      <v-list-item
        v-for="message in chatListAscSorted"
        :key="message._id"
      >
        <v-list-item-content>
          <v-list-item-title v-text="message.value"></v-list-item-title>
          <v-list-item-subtitle v-text="message.username"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-bottom-navigation
      color="white"
      class="bottom-navigation"
    >
      <v-text-field
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
      inputMessage: '',
      messageBoxElement: null,
    }
  },

  watch: {
    chatListAscSorted() {
      if (!this.messageBoxElement) return

      this.$nextTick(( ) => {
        this.scrollToEnd(this.messageBoxElement)
      })
    },
    loading(load) {
      if (!load) {
        this.$nextTick(( ) => {
          this.messageBoxElement = this.$refs.container
          this.scrollToEnd(this.messageBoxElement)
        })
      }
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
    },

    scrollToEnd(el) {
      el.scrollTo(0, el.scrollHeight)
    },
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
  max-width: 500px;
  position: relative;

  .bottom-navigation {
    position: sticky;
    bottom: 0;
  }
}
</style>
