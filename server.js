import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createServer } from "http";
import { ACTIONS } from "./Actions.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (clientSocketid) => {
      return {
        socketId: clientSocketid,
        username: userSocketMap[clientSocketid],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("Socket connected: ", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    //khud ko chod ke room mein jitne hai unko bhej do 
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    // io.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
