<template>
  <div class="container">
    
    <VueLoader v-if="loading" class="message-box" />

    <div v-else class="message-box" ref="messageBox">
      <div
        class="message-box__item"
        v-for="chatItem in chatListAscSorted"
        :key="chatItem._id"
      >
        <div v-if="chatItem._type === 'invited'" class="invited">
          <MessageInvited :data="chatItem.text" />
        </div>

        <MessageText class="message-box__message" v-else :data="chatItem" />
      </div>
    </div>

    <InputField 
      class="message-box__input-field"
      v-model="inputMessage.value" 
      @message="sendChatMessage" 
    />
  </div>
</template>

<script>
import VueLoader from "@/components/VueLoader"

import MessageText from "./components/MessageText"
import MessageInvited from "./components/MessageInvited"
import InputField from "./components/InputField"

import { mapGetters, mapActions, } from "vuex"
export default {
  name: "Home",
  
  components: {
    MessageText,
    MessageInvited,
    InputField,
    VueLoader,
  },

  data() {
    return {
      inputMessage: {
        value: "",
        error: ""
      },
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
          this.messageBoxElement = this.$refs.messageBox
        })
      }
    }
  },

  created() {
    this.initWebSocket()
  },

  computed: {
    ...mapGetters([
      "chatListAscSorted",
      "username",
      "loading",
    ]),
  },
  methods: {
    ...mapActions([
      "resolveMessageData",
      "sendMessage",
      "initWebSocket",
    ]),
    sendChatMessage() {
      const { value } = this.inputMessage
      if (value.length) {
        this.sendMessage(value)
        this.inputMessage.value = ""
      }
    },
    scrollToEnd(elem) {
      elem.scrollTo(0, elem.scrollHeight)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.message-box {
  flex-grow: 1;
  overflow: auto;
}

.message-box__input-field {
  padding: 20px;

  box-shadow: 3px 0px 10px 0px #021827;
  box-sizing: border-box;
  z-index: 1;
}

.message-box__item {
  display: flex;
}

.message-box__item:not(:first-child) .message {
  margin-top: 10px;
}

.message-box__item:last-child {
  margin-bottom: 10px;
}

.invited {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
