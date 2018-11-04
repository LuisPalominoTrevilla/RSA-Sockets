<template>
    <b-container class="menu">
        <b-form
            class="form"
            @submit="enterChatRoom">
            <b-form-group>
                <label>ChatRoom</label>
                <b-form-input
                    type="number"
                    v-model="chatRoom"
                    required
                    placeholder="Chatroom No."/>
                <label>Nickname</label>
                <b-form-input
                    type="text"
                    v-model="name"
                    required
                    placeholder="Enter nickname"/>
            </b-form-group>
            <b-button type="submit">
                Entrar
            </b-button>

        </b-form>
    </b-container>
</template>

<script>
import socket from '@/socket';

export default {
    name: 'Menu',

    data() {
        return {
            name: '',
            chatRoom: 0
        }
    },

    methods: {
        enterChatRoom(e) {
            e.preventDefault();
            socket.emit('setName', this.name);
            this.$router.push({ name: 'chatRoom', params: {id: this.chatRoom} })
        }
    }
}
</script>

<style>
.menu{
    margin-top: 50px;
}
</style>
