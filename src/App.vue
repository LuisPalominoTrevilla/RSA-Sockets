<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>Ingrese a una sala de chat</h2>
    <Menu/>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

label{
  font-size: 25px;
}
</style>
