import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { MessageProps } from '@/app/result/sections/Message';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://memory-wall-two.vercel.app/", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

// Store messages in memory (consider Redis for production)
const messages: MessageProps[] = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages to new client
  socket.emit('initial_messages', messages);

  socket.on('slingEvent', (data) => {
    const newMessage = {
      name: data.user.name,
      email: data.user.email,
      message: data.user.message,
      profilePicture: data.profilePicture
    };
    
    messages.push(newMessage);
    io.emit('sling_received', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});