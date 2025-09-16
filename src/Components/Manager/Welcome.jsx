import React from "react";
import "../../styles/Manager/Manager.css";
import { useNavigate } from "react-router-dom";

export const WelcomeManager = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="main-text">
        <h2>
          Welcome <span>Manager!</span>
        </h2>
        <button onClick={() => navigate("/manager-dashboard")}>Get to work →</button>
      </div>
    </>
  );
};
