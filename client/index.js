var ws = new WebSocket("ws://localhost:8083");
ws.onclose = function () {
  console.log("ws onclose");
  clearTimeout(heartCheck.timeoutObj);
};
ws.onopen = function () { 
  console.log("ws onopen");
  ws.send("from client: hello");
  heartCheck.start();
};
ws.onmessage = function (e) {
  console.log("from server: " + e.data);
  heartCheck.reset();
};

window.onload = () => {
  const buttonEl = document.getElementById("button");
  buttonEl.addEventListener("click", () => {
    ws.send(Math.random());
  });
};

var heartCheck = {
  timeout: 3000,
  timeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj);
    this.start();
  },
  start: function () {
    this.timeoutObj = setTimeout(function () {
      ws.send(JSON.stringify({ type: "HeartBeat" }));
    }, this.timeout);
  },
};
