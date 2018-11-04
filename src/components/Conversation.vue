<template>
    <div class="conversation" id="conversation">
      <ul class="messages">
        <li
          :key="message.id"
          v-for="message in messages"
          class="message"
          :class="{'self':message.uid == uid}">
          <h5>{{ message.nickname }}</h5>
          {{ message.text }}
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    props: {
        messages: {
            type: Array,
            required: true
        },
        uid: {
            type: Number,
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

h5{
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 1.2%;
  border-bottom: 1px solid #444;
}

.conversation{
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  border: 1px solid #cecece;
  margin: 0 auto;
  overflow-y: scroll;
}

.message{
  max-width: 60%;
  min-height: 60px;
  margin-top: 30px;
  margin-bottom: 40px;
  margin-left: 20px;
  background-color: rgb(92, 185, 170);
  border: 1px solid #4c6862;
  border-radius: 100px 100px 100px 0;
  box-shadow: -3px 3px #1b5357;
  padding-top: 1%;
}

.self{
  background-color: rgb(119, 212, 155);
  border: 1px solid #305738;
  border-radius: 100px 100px 0 100px;
  box-shadow: 3px 3px #1c3321;
  margin-left: 38%;
}
</style>

