import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeAdmin = () => {
    const navigate = useNavigate();
  return (
    <div className="main-text">
      <h2>
        Welcome <span>Admin!</span>
      </h2>
      <button onClick={() => navigate("/admin-login")}>
        Get to work →
      </button>
    </div>
  );
};

export default WelcomeAdmin;
