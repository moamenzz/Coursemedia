import { Server } from "socket.io";

export const setupSocketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  });
};
