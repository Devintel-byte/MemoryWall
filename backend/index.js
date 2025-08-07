import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
// import { MessageProps } from '@/app/result/sections/Message';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://memorywall-uduu.onrender.com", "https://memory-wall-two.vercel.app" ],
    methods: ["GET", "POST"]
  }
});

// In-memory store (consider Redis for production)
const messages = [];

io.on('connection', (socket) => {
  console.log('New client connected');
  
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
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});