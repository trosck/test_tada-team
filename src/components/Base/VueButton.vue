<template>
  <button @click="$emit('click', $event)" class="vue-button">
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    label: String,
  },
}
</script>

<style lang="scss" scoped>
@import "./src/scss/ui-elements";

.vue-button {
  font-size: 15px;
  padding: 5px 25px;
  @include form_element();
}
</style>