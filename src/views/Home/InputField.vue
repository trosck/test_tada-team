<template>
  <div class="input-field">
    <VueInput
      class="input-field__input"
      @input="$emit('input', $event)"
      @keyup-enter="$emit('message')"
      :value="value"
    />

    <VueButton
      @click="$emit('message')"
      label="Send"
    />
  </div>
</template>

<script>
import VueInput from "@/components/Base/VueInput"
import VueButton from "@/components/Base/VueButton"
export default {
  components: {
    VueInput,
    VueButton,
  },
  props: {
    value: String
  },
}
</script>

<style lang="scss" scoped>
.input-field {
  display: flex;
}
.input-field__input {
  height: 100%;
  flex-grow: 1;
  margin-right: 10px;
}
</style>
