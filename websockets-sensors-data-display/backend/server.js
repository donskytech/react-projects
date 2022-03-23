// import express from "express";
// import dotenv from "dotenv";
// // Note when importing files add ".js"
// // import products from "./dataproducts.js";
// import { WebSocketServer, WebSocket } from "ws";

// dotenv.config();

// const app = express();

// app.get("/", (req, res) => {
//   res.send("API is running!");
// });

// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function message(data) {
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//         console.log("data", data);
//       }
//     });
//   });

//   // ws.send("something");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, console.log("Server running on port 5000"));

// *************************************************************  //

// import { WebSocketServer } from "ws";

// const server = new WebSocketServer({ port: 8081 });

// const users = new Set();
// const recentMessages = [];

// const sendMessage = (message) => {
//   for (const user of users) {
//     user.socket.send(JSON.stringify(message));
//   }
// };

// server.on("connection", (socket) => {
//   console.log("New user connected!");

//   const userRef = {
//     socket: socket,
//     lastActiveAt: Date.now(),
//   };
//   users.add(userRef);

//   socket.on("message", (message) => {
//     try {
//       const parsedMessage = JSON.parse(message);

//       if (
//         typeof parsedMessage.sender !== "string" ||
//         typeof parsedMessage.body !== "string"
//       ) {
//         console.error("Invalid message received!", message);
//         return;
//       }

//       const numberOfRecentMessages = recentMessages.filter(
//         (message) => message.sender === parsedMessage.sender
//       ).length;
//       if (numberOfRecentMessages >= 30) {
//         socket.close(4000, "flooding the chat");
//         return;
//       }

//       const verifiedMessage = {
//         sender: parsedMessage.sender,
//         body: parsedMessage.body,
//         sentAt: Date.now(),
//       };

//       sendMessage(verifiedMessage);

//       userRef.lastActiveAt = Date.now();

//       recentMessages.push(verifiedMessage);
//       setTimeout(() => recentMessages.shift(), 60000);
//     } catch (error) {
//       console.error("Error parsing message!", error);
//     }
//   });

//   socket.on("close", (code, reason) => {
//     console.log(`User disconnected with code ${code} and reason ${reason}!`);
//     users.delete(userRef);
//   });
// });

// setInterval(() => {
//   const now = Date.now();

//   for (const user of users) {
//     if (user.lastActiveAt < now - 300000) {
//       user.socket.close(4000, "inactivity");
//     }
//   }
// }, 10000);

// *************************************************************  //
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
});

server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);
  console.log(`Path name ${pathname}`);

  if (pathname === "/request") {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit("connection", ws, request);
    });
  } else if (pathname === "/send") {
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

setInterval(() => {
  const now = Date.now();
  let message = { date: now, sensorData: getRandomArbitrary(0, 100) };
  const jsonMessage = JSON.stringify(message);
  // console.log(jsonMessage);
  sendMessage(jsonMessage);
}, 2000);

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
