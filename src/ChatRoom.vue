<template>
  <div id="chat">
    <Chat />
  </div>
</template>

<script>
import Chat from '@/components/Chat/Chat.vue';

export default {
  name: 'chatRoom',
  components: {
    Chat
  }
}
</script>

<style>
#chat {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
