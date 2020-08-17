<template>
  <div class="root" ref="root">
    <div class="content">
      <VueHeader />
      <router-view class="content__main" />
    </div>
  </div>
</template>

<script>
import VueHeader from "@/components/Base/VueHeader"

export default {
  components: {
    VueHeader,
  },
}
</script>

<style lang="scss" scoped>
.root {
  min-width: 100vw;
  min-height: 100vh;

  max-width: 100vw;
  max-height: 100vh;

  background-color: #021827;
}

.content {
  max-width: 500px;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
  margin: auto;
  background-color: #02193B;

  display: flex;
  flex-direction: column;
}

.content__main {
  flex-grow: 1;
  overflow: auto;
}
</style>
