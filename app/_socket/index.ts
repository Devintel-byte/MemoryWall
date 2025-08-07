import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

export const socket = io(URL || 'https://memorywall-backend.onrender.com', {
  transports: ['websocket'],
  secure: true,
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000
});