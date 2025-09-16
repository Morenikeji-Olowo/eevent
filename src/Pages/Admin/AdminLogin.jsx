import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../styles/Admin/Admin.css';
const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    email: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Admin/adminLogin.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
          credentials: "include",
        }
      );

      const response = await res.json();

      if (response.success) {
        toast.success("Logged in successfully");
        setAdminData({ email: "", token: "" });
        navigate("/admin-dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2 className="admin-login-title">Admin Login</h2>

        <div className="admin-input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-input-group">
          <label>Token</label>
          <input
            type="password"
            name="token"
            value={adminData.token}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="admin-login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
