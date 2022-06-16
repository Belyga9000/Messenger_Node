const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let usercount = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const user = "User" + Date.now();
  io.emit("updateUserCount", (usercount += 1));
  io.emit("chat message", user, " Connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", user, ":" + msg);
  });

  socket.on("disconnect", () => {
    io.emit("updateUserCount", (usercount -= 1));
    io.emit("chat message", user, " Disconnected");
  });
});

server.listen(3000, () => {});
