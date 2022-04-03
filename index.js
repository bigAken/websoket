const express = require("express");
const path = require("path");
const app = express();

const server = require("http").Server(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8083 });

wss.on("connection", function connection(ws) {
  console.log("server: receive connection.");

  ws.on("message", function incoming(data) {
    console.log("data", typeof data.toString());
    console.log("JSON", data.toString());
    if (data.toString().includes("type")) {
      console.log(JSON.parse(data.toString()));
      const formatData = JSON.parse(data.toString());
      if (formatData.type === "HeartBeat") {
        ws.send(JSON.stringify({ type: "HeartBeat---server " }));
      }
    }
  });

  ws.send("world");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.join(__dirname, "/client")));

app.listen(3000);
