//Creo una instancia de socket.io desde el lado del cliente

const socket = io();

//Creo una variable para guardar al usuario.
let user;
const chatBox = document.getElementById("chatBox");

//Utilizo Sweet Alert para el mensaje de bienvenida

//Swal es un objeto global que nos permite usar los métodos de la librería.
//Fire es un método que nos permite configurar el alerta.
Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un usuario para identificarte en el chat",
  //VAlidaciones:
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre para continuar";
  },
  //ahora deshabilito el click por fuera para que si o si tenga que escribir el nombre
  allowOutsideClick: false,
}).then((result) => {
  user = result.value; //concatenamos con el método .then que en el caso que alguien ingresó un dato al imput lo cargue en usuario. (user: va a tener el dato que viene del resultado)
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      //.trim nos permite sacar los espacios en blanco del principio y del final de un string.
      //Si el mensaje tiene más de 0 caracteres, lo enviamos al servidor.
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//Listener de mensajes:

socket.on("messagesLogs", (data) => {
  const log = document.getElementById("messagesLogs");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message} <br>`;
  });
  log.innerHTML = messages;
});
