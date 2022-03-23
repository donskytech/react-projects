import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KickScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <main className="simple-wrapper">
      <p className="simple-heading">Oh no!</p>

      <p className="simple-subhead">You were kicked for {state?.kickReason}.</p>

      <div className="simple-section">
        <button onClick={() => navigate("/")}>Go back home</button>
      </div>
    </main>
  );
};

export default KickScreen;
