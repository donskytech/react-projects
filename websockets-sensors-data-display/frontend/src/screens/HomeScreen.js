import React from "react";

// const HomeScreen = () => {
//   return <div>Home Screen</div>;
// };

import { useState, useEffect } from "react";
import "../Chat.css";

const URL = "ws://127.0.0.1:8080/bar";

const HomeScreen = () => {
  const [user, setUser] = useState("Tarzan");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  let webSocket = new WebSocket(URL);
  webSocket.binaryType = "arraybuffer";

  const [ws, setWs] = useState(webSocket);

  const submitMessage = (usr, msg) => {
    const message = { user: usr, message: msg };
    console.log("Message sent :: ", message);
    ws.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket succesfully Connected");
    };
    let reader, message;
    ws.onmessage = (event) => {
      // if (event.data) return;
      console.log("Message received :: ", event.data);
      // const
      if (event.data instanceof Blob) {
        reader = new FileReader();

        reader.onload = () => {
          console.log("Result: " + reader.result);
          message = reader.readAsText(event.data);
        };

        message = reader.readAsText(event.data);
        console.log("Blob Message :: ", message);
      } else {
        message = JSON.parse(event.data);
      }
      if (message) setMessages([message, ...messages]);
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws, messages]);

  return (
    <div>
      <label htmlFor="user">
        Name :
        <input
          type="text"
          id="user"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>

      <ul>
        {messages.reverse().map((message, index) => (
          <li key={index}>
            <b>{message.user}</b>: <em>{message.message}</em>
          </li>
        ))}
      </ul>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submitMessage(user, message);
          setMessage([]);
        }}
      >
        <input
          type="text"
          placeholder={"Type a message ..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value={"Send"} />
      </form>
    </div>
  );
};

export default HomeScreen;
