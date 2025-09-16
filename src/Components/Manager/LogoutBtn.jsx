import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/Manager/Manager.css';

const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/eevent/src/BackEnd/src/Auth/Logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        navigate("/manager");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="manager-logout">
      <button className="logout-btn" onClick={handleLogout}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LogoutBtn;
