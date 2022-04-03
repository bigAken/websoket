const express = require("express");
const path = require("path");
const app = express();

const server = require("http").Server(app);
const WebSocket = require("ws");

const wss = new WebSocket.WebSocketServer({ port: 8083 });

wss.on("connection", function connection(ws) {
  console.log("server: receive connection.");

  ws.isAlive = true;
  ws.on("pong", heartbeat);

  ws.send("world");
});
function heartbeat(...ws) {
  this.isAlive = true;
  console.log("xintiao");
  console.log(111, ws);
}
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 3000);

wss.on("close", function close() {
  console.log("关闭");
  clearInterval(interval);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.join(__dirname, "/client")));

app.listen(3000);
