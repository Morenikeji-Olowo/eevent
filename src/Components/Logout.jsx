import React from 'react'
import '../styles/DashBoard.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"; // make sure you installed react-toastify
import "react-toastify/dist/ReactToastify.css";


const Logout = () => {
    const navigate = useNavigate();
    const handleLogout =  async () => {
        try{
            const res = await fetch("http://localhost/React/eevent/src/BackEnd/src/Auth/Logout.php", {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                navigate("/authenticate");
            }
        } 
        catch (error) {
            console.error("Logout failed:", error);
        }

    }
    
  return (
    <div className="logout">
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout