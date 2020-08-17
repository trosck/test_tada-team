<template>
  <label class="vue-input__label">
    {{ label }}

    <span v-if="label" class="vue-input__delimiter"></span>

    <input
      class="vue-input__input"
      :class="{ error }"

      :value="value"
      
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('keyup-enter', $event)"
    />
  </label>
</template>

<script>
export default {
  props: {
    label: String,
    type: {
      type: String,
      default: "text",
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: String,
  }
}
</script>

<style lang="scss">
@import "./src/scss/ui-elements";

.vue-input__label {
  display: flex;
  flex-direction: column;
}

.vue-input__delimiter {
  width: 100%;
  height: 10px;
}

.vue-input__input {
  height: 100%;
  border: 0;
  padding: 5px 10px;
  @include form_element();
}

.vue-input__input.error {
  border-color: #D93532;
}
</style>