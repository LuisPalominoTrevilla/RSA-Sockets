import socket from '@/socket';
import Conversation from '@/components/Conversation.vue';
import RSA from '@/modules/rsa.js';

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
      notification2: null,
      key: null,
      crypt: null
    }
  },

  beforeMount() {
    this.crypt = new RSA();
    this.socket.emit('setKey', this.crypt.publicKey);
  },

  mounted() {

    this.socket.on('set-key', key => {
      this.key = key;
    });

    this.socket.emit('joinRoom', this.$route.params.id);

    this.socket.on('set-uid', uid => {
      this.uid = uid;
    });

    this.socket.on('message', data => {
      if (this.crypt) {
        let dec = this.crypt.decrypt(data.text);
        data.text = dec;
        this.messages.push(data);
      }
    });

    this.socket.on('no-name', () => {
      console.log("WEB");
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
      if (this.key && this.crypt) {
        this.socket.emit('send-message', {text: this.crypt.encrypt(this.msg, this.key.n, this.key.e)});
        this.msg = '';
      }
      return false;
    },
    isTyping() {
      this.socket.emit('typing');
    }
  }
}