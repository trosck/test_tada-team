<template>
  <div 
    class="message"
    :class="{ self: data._self }"
  >
    <div class="message__body">
      <div class="message__name" v-if="!data._self">
        {{data.name}}
      </div>
      <div class="message__text">
        {{ data.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageText",
  props: {
    data: Object,
  },
  computed: {
    avatarLetters() {
      const name = this.data.name.split(" ")

      try {
        const first = name[0][0]
        const second = name[1][0]
        return first + " " + second
      }
      catch(error) {
        return name[0][0]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex: 0 0 auto;

  background-color: #053C61;
  max-width: 80%;
  padding: 10px;

  border-radius: 0 10px 10px 0;
}

.message.self {
  margin-left: auto;
  border-radius: 10px 0 0 10px;
}

.message__name {
  font-size: 10px;
  opacity: .8;
  margin-bottom: 5px;
}

.message__text {
  font-size: 14px;
  word-break: break-all;
}
</style>
