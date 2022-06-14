<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="header"
    >
      <a href="/" class="text-h5 title">
        vue-ws-chat <v-icon>mdi-github</v-icon>
      </a>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view class="content"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
.title {
  color: white;
  text-decoration: none;
}
.header, .content {
  max-width: 500px;
  margin: auto;
}
</style>
