import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const navigateToChatPage = () => {
    if (name !== "") navigate(`/chat/${name}`);
  };

  return (
    <main className="simple-wrapper">
      <p className="simple-heading">Hey there</p>

      <p id="name-label" className="simple-subhead">
        What should your peers call you?
      </p>

      <div className="simple-section">
        <input
          aria-labelledby="name-label"
          type="text"
          autoComplete="name"
          placeholder="Your name or nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") navigateToChatPage();
          }}
        />
      </div>

      <div className="simple-section">
        <button onClick={navigateToChatPage}>Start chatting</button>
      </div>
    </main>
  );
};

export default AuthScreen;
