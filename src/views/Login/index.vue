<template>
  <div class="container login">
    <v-text-field
      v-model="input"
      @keyup.enter="getLogin"
      label="Please, enter nickname"
      autofocus
    ></v-text-field>

    <v-btn
      elevation="2"
      @click="getLogin"
    >
      login
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Login",
  data() {
    return {
      input: ''
    }
  },
  methods: {
    ...mapActions([
      "loginUser",
    ]),
    async getLogin() {
      await this.loginUser(this.input)
      this.$router.push({ name: "home" })
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