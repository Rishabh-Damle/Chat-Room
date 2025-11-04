"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
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
//# sourceMappingURL=index.js.map