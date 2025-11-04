import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];
wss.on("connection", (socket) => {
  allSockets.push(socket);
  userCount = userCount + 1;
  console.log("User connected # " + userCount);

  socket.on("message", (message) => {
    allSockets.forEach((s) => {
      s.send(message.toString());
    });
  });
  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });
});
