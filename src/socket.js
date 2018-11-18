import io from 'socket.io-client';

const socket = io.connect('192.168.100.8:3001', { forcenew: true });

export default socket;