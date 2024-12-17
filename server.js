const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Cola simulada para el procesamiento de mensajes
const queue = [];

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Cuando el cliente envía un mensaje
  socket.on("message", (msg) => {
    console.log("Mensaje recibido:", msg);
    queue.push(msg);  // Agregar el mensaje a la cola

    // Simular procesamiento de la cola después de 2 segundos
    setTimeout(() => {
      const response = `Respuesta del bot a: "${queue.shift()}"`;
      socket.emit("response", response);  // Enviar la respuesta al cliente
    }, 2000);
  });

  // Cuando el cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Servir el archivo HTML principal desde la carpeta "public"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// El servidor escucha en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
