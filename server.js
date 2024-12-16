const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const queue = []; // Cola simulada

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (msg) => {
    console.log("Mensaje recibido:", msg);
    queue.push(msg); // Agregar a la cola

    // Simular procesamiento después de 2 segundos
    setTimeout(() => {
      const response = `Respuesta del bot a: "${queue.shift()}"`;
      socket.emit("response", response);
    }, 2000);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
