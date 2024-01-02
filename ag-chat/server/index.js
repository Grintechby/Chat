const ws = require("ws");

const Events = {
  Message: "message",
  Connection: "connection",
};

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => console.log("Server started on 5000 port")
);

const broadcastMessage = (message) => {
  const currentMessage = JSON.stringify(message);

  wss.clients.forEach((client) => {
    client.send(currentMessage);
  });
};

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);

    switch (message.event) {
      case Events.Message:
        broadcastMessage(message);

        break;
      case Events.Connection:
        broadcastMessage(message);

        break;
    }
  });
});
