/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
// import { MessageProps } from '@/app/result/sections/Message';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'messages.json');

// Load messages from file on startup
let messages = [];
try {
  messages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) || [];
} catch (err) {
  console.log('No existing messages file, starting fresh');
}

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://memory-wall-two.vercel.app",
      "https://memorywall-uduu.onrender.com",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket'],
  perMessageDeflate: false,
  pingTimeout: 60000,
  pingInterval: 25000
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send existing messages to new client
  socket.emit('initial_messages', messages);

socket.on('slingEvent', (data) => {
  const newMessage = {
    name: data.user.name,
    email: data.user.email,
    message: data.user.message,
    profilePicture: data.profilePicture,
    timestamp: new Date().toISOString() // Add timestamp
  };
    
  messages.push(newMessage);
  
  // Save to file
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  
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