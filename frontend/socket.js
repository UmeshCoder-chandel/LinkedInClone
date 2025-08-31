import {io} from 'socket.io-client'

const socket = io("https://linkedinclone-backend-i2bq.onrender.com", {
    withCredentials: true,
    transports: ["websocket"],
    timeout: 10000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
});

// Add error handling
socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('connect_timeout', () => {
    console.error('Socket connection timeout');
});

export default socket;