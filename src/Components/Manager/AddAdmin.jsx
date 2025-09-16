import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/Manager/Manager.css";
import { toast } from "react-toastify";
const AddAdmin = () => {
  const [clicked, setClicked] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    token: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(
      "http://localhost/React/Eevent/src/BackEnd/src/Manager/addAdmin.php",
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
      toast.success("Admin added successfully");
      setAdminData({ name: "", token: "", email: "" }); 
      setClicked(false); 
    } else {
      toast.error(response.message);
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error("Something went wrong");
  }
};


  return (
    <>
      <div
        onClick={() => setClicked((prev) => !prev)}
        className="add-admin-component"
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>

      {clicked && (
        <div className="highlight-container" onClick={() => setClicked(false)}>
          <div className="overlay" onClick={(e) => e.stopPropagation()}>
            <form className="input-form" onSubmit={handleSubmit}>
              <label>Name of Admin</label>
              <input
                type="text"
                name="name"
                value={adminData.name}
                onChange={handleChange}
                required
              />

              <label>Token</label>
              <input
                type="text"
                name="token"
                value={adminData.token}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleChange}
              />

              <button type="submit" className="submit-btn">
                Add Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAdmin;
