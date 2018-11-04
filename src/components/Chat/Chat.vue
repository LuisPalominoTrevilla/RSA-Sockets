<template>
  <b-container>
    <h3> Sala de chat # {{this.$route.params.id}}</h3>
    <div id="notifications">
      <h4 v-if="notification">{{ notification }}</h4>
    </div>
    <conversation
      :messages="messages"
      :uid="uid"/>
    <div id="notifications2">
      <h4 v-if="notification2">{{ notification2 }}</h4>
    </div>
    <b-form @submit="sendMessage">
      <b-form-group class="form-group">
        <b-form-input
          type="text"
          placeholder="message here please"
          v-model="msg"
          class="form-input"
          @input="isTyping"/>
        <b-button 
          type="submit"
          class="form-button"
          :disabled="uid == -1 || msg == ''">
          Enviar
        </b-button>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script src="./chat.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 1rem 0;
}

#notifications {
  height: 2em;
}

#notifications2 {
  height: 2em;
}

h4 {
  font-size: 15px;
}

.form-group{
  margin-top: 3rem;
  position: relative;
}

.form-input{
  position: absolute;
  left: 0;
  width: 80%
}

.form-button{
  position: absolute;
  right: 0;
  width: 20%;
}

</style>
