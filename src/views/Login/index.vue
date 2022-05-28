<template>
  <div class="container login">
    <VueInput 
      v-model="inputName.value" 
      :error="inputName.error" 
      @keyup-enter="getLogin"
      label="Please, enter your name"
    />
    <div 
      class="login__error" 
      v-if="inputName.error"
    >
      Nickname must be at least 4 characters
    </div>
    <VueButton @click="getLogin" label="login" class="login__button" />
  </div>
</template>

<script>
import VueInput from "@/components/Base/VueInput"
import VueButton from "@/components/Base/VueButton"

import { mapActions } from "vuex"
export default {
  name: "login",
  components: {
    VueInput,
    VueButton,
  },
  data() {
    return {
      inputName: {
        value: "",
        error: false,
      }
    }
  },
  methods: {
    ...mapActions([
      "loginUser",
    ]),
    async getLogin() {
      const { value } = this.inputName

      if (!value || value.length < 4) {
        this.inputName.error = true
      }
      else {
        await this.loginUser(value)
        this.$router.push({ name: "home" })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.login__button {
  margin-top: 10px;
}
.login__error {
  padding-top: 10px;
}
</style>