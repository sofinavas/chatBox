const express = require("express");
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.static("./src/public")); //Le digo que el material estático está en la carpeta public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuro Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
  res.render("index");
});

//Listen
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});

//Me guardo una referencia del servidor

//Genero una instancia de Socket.io del lado del backend.
const io = new socket.Server(httpServer);

//Por ahora guardaremos este chat en la memoria volatil del servidor en un pequeño array (más adelante lo haremos en una base de datos)
let messages = [];

//Establecemos la conection con nuestro cliente
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    messages.push(data);
    //Emitimos mensaje para el cliente con todo el array de datos:
    io.emit("messagesLogs", messages);
  });
});
