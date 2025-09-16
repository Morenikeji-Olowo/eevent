import '../../styles/Welcome.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className="main-text">
        <h2>Find events with <span>Ease!</span></h2>
        <button onClick={() => navigate("/authenticate")}>Get started →</button>
      </div>
    </>
  );
}

export default Welcome;
