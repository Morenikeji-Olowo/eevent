import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../Config/firebaseConfig";
import { toast } from "react-toastify"; // make sure you installed react-toastify
import "react-toastify/dist/ReactToastify.css";
import '../../styles/Google.css'
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate()
  async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Auth/googleLogin.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message); // show toast from PHP message
        navigate("/getDetails")
      } else {
        toast.error(data.error || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    }
  }

  return (
    <button className="google-btn" onClick={googleLogin}>
      Sign in with Google
    </button>
  );
};

export default Google;
