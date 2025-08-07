import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-socket-server.com' 
  : 'http://localhost:3001';

export const socket = io(URL, {
  transports: ['websocket'],
  secure: process.env.NODE_ENV === 'production',
});