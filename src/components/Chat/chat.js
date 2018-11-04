import socket from '@/socket';
import Conversation from '@/components/Conversation.vue';

export default {
  name: 'HelloWorld',

  components: {
    Conversation
  },

  data() {
    return {
      messages: [],
      socket: socket,
      msg: '',
      uid: -1,
      notification: null,
      notification2: null
    }
  },

  mounted() {
    this.socket.emit('joinRoom', this.$route.params.id);
    this.socket.on('set-uid', uid => {
      this.uid = uid;
    });
    this.socket.on('message', data => {
      this.messages.push(data);
    });
    this.socket.on('no-name', () => {
      this.$router.push('/');
    });
    this.socket.on('notification', data => {
      this.notification = data;
      setTimeout(() => {
        this.notification = null;
      }, 2000);
    });
    this.socket.on('typing', data => {
      if (!this.notification2) {
        this.notification2 = data;
        setTimeout(() => {
          this.notification2 = null;
        }, 800);
      }
    });
  },

  updated() {
    let conversation = document.getElementById('conversation');
    if (conversation) {
      conversation.scrollTop = conversation.scrollHeight;
    }
  },

  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('send-message', {text: this.msg});
      this.msg = '';
      return false;
    },
    isTyping() {
      this.socket.emit('typing');
    }
  }
}