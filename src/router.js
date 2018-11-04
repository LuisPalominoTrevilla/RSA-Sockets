import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import ChatRoom from '@/ChatRoom.vue';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {
                default: App
            }
        },
        {
            path: '/chatRoom/:id',
            name: 'chatRoom',
            components: {
                default: ChatRoom
            }
        }
    ]
});

export default router;