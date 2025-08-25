import React, { useState } from "react";
import "./Authenticate.css";
import Google from "../../Components/SignUpOptions/Google";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const navigate = useNavigate();
  const [overlayError, setOverlayError] = useState("");

  const [errors, setErrors] = useState({});
  const [currentState, setCurrentState] = useState("Sign Up");
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSChanges = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLChanges = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/eevent/src/BackEnd/src/Auth/signUp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpData),
        }
      );
      const phpResponse = await response.json();

      if (!response.ok) {
        if (phpResponse.errors?.duplicate) {
          setOverlayError(phpResponse.errors.duplicate);
        } else {
          setErrors(phpResponse.errors || { general: phpResponse.message });
        }
      } else {
        alert(phpResponse.message);
        setErrors({});
        setOverlayError("");
        setCurrentState("Login");
      }
      setCurrentState("Login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/eevent/src/BackEnd/src/Auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // <-- important for PHP session cookies
          body: JSON.stringify(loginData),
        }
      );

      const phpResponse = await response.json();

      if (!response.ok) {
        setErrors(phpResponse.errors || {});
      } else {
        alert(phpResponse.message);
        setErrors({});
        navigate("/getDetails");

        // Optionally redirect user or store user info
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="authenticate">
      <div className="authenticate-container">
        {overlayError && (
          <div className="overlay">
            <div className="overlay-box">
              <p>{overlayError}</p>
              <button onClick={() => setOverlayError("")}>Close</button>
            </div>
          </div>
        )}

        <div className="left-img"></div>
        <div className="right-side">
          <div className="options">
            <p
              className={`option ${currentState === "Sign Up" ? "active" : ""}`}
              onClick={() => setCurrentState("Sign Up")}
            >
              Sign Up
            </p>
            <p
              className={`option ${currentState === "Login" ? "active" : ""}`}
              onClick={() => setCurrentState("Login")}
            >
              Login
            </p>
          </div>

          <form>
            {currentState === "Sign Up" && (
              <>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Your first name..."
                  name="firstName"
                  onChange={handleSChanges}
                  required
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}

                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Your last name..."
                  name="lastName"
                  onChange={handleSChanges}
                  required
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}

                <label>Valid Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  onChange={handleSChanges}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleSChanges}
                  required
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={handleSChanges}
                  required
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </>
            )}

            {currentState === "Login" && (
              <>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Your email address..."
                  name="email"
                  onChange={handleLChanges}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleLChanges}
                  required
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </>
            )}

            <button
              type="submit"
              onClick={currentState === "Sign Up" ? handleSignUp : handleLogin}
            >
              {currentState}
            </button>
          </form>

          <p className="switch-text">
            {currentState === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setCurrentState("Login")}>Login</span>
              </>
            ) : (
              <>
                Register for an account?{" "}
                <span onClick={() => setCurrentState("Sign Up")}>Register</span>
              </>
            )}
          </p>
          <div className="divider">
            <span>OR</span>
          </div>
          <Google />
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
