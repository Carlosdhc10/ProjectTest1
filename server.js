const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const queue = []; // Cola simulada

// Cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Cuando el cliente envía un mensaje
  socket.on("message", (msg) => {
    console.log("Mensaje recibido:", msg);
    queue.push(msg); // Agregar el mensaje a la cola

    // Simula procesamiento de la cola después de 2 segundos
    setTimeout(() => {
      const response = `Respuesta del bot a: "${queue.shift()}"`;
      socket.emit("response", response); // Envía la respuesta al cliente
    }, 2000);
  });

  // Cuando el cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// El servidor escucha en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
