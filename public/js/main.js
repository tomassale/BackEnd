const socket = io.connect();

socket.on("messages", (data) => {
  render(data);
});

const render = (data) => {
  const html = data
    .map((obj) => {
      return `<p class="mensajesNuevos"><span>[${obj.datetime}]</span> <strong>${obj.email}</strong>: ${obj.mensaje}</p>`;
    })
    .join(" ");
  document.querySelector("#mensajes").innerHTML = html;
};

const addMessage = (e) => {
  const mensaje = {
    email: document.querySelector("#email").value,
    datetime: new Date().toLocaleString(),
    mensaje: document.querySelector("#mensaje").value,
  };
  socket.emit("new-message", mensaje);
  document.querySelector("#mensaje").value = "";
  return false;
};
