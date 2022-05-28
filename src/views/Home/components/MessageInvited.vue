<template>
  <div class="invited__text">{{ data }}</div>
</template>

<script>
export default {
  name: "MessageInvited",
  props: {
    data: String,
  },
}
</script>

<style lang="scss" scoped>
.invited__text {
  margin: 10px auto;
  padding: 5px;
  
  border: 1px solid #fff;
  border-radius: 5px;

  width: min-content;
  width: fit-content;
}
</style>
