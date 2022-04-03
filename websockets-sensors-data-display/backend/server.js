import { createServer } from "http";
import { parse } from "url";
import { WebSocketServer } from "ws";

const server = createServer();
const wss1 = new WebSocketServer({ noServer: true });
const wss2 = new WebSocketServer({ noServer: true });

const users = new Set();

wss1.on("connection", function connection(socket) {
  console.log("wss1:: User connected");
  const userRef = {
    socket: socket,
    connectionDate: Date.now(),
  };
  console.log("Adding to set");
  users.add(userRef);
});

wss2.on("connection", function connection(ws) {
  console.log("wss2:: socket connection ");
  ws.on('message', function message(data) {
      const now = Date.now();

      const parseData = JSON.parse(data);
      let message = { date: now, sensorData: parseData.value };
      const jsonMessage = JSON.stringify(message);
      sendMessage(jsonMessage);
  });

  ws.send('something');
});



server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);
  console.log(`Path name ${pathname}`);

  if (pathname === "/request") {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit("connection", ws, request);
    });
  } else if (pathname === "/sendSensorData") {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);

const sendMessage = (message) => {
  // console.log("Sending messages to users!");
  for (const user of users) {
    user.socket.send(message);
  }
};

// setInterval(() => {
//   const now = Date.now();
//   let message = { date: now, sensorData: getRandomArbitrary(0, 100) };
//   const jsonMessage = JSON.stringify(message);
//   // console.log(jsonMessage);
//   sendMessage(jsonMessage);
// }, 2000);

// function getRandomArbitrary(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }
