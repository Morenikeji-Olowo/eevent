import React, { useState, useRef } from 'react';

import '../../styles/CollectData.css';
import FirstPage from '../../Components/ProgressComponent/FirstPage/FirstPage';
import SecondPage from '../../Components/ProgressComponent/SecondPage/SecondPage';
import ThirdPage from '../../Components/ProgressComponent/ThirdPage/ThirdPage';
import LastPage from '../../Components/ProgressComponent/LastPage/LastPage';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"; // make sure you installed react-toastify
import "react-toastify/dist/ReactToastify.css";

const CollectData = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    displayName: '',
    bio: '',
    pfp: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Handle text inputs
 

  const checkUsername = async (username) => {
  try {
    const res = await fetch(
      "http://localhost/React/eevent/src/BackEnd/src/ProgressData/CheckUsername.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        credentials: "include",
      }
    );
    const data = await res.json();
    return data.success; // true if valid
  } catch (err) {
    console.error(err);
    return false;
  }
};
const typingTimeout = useRef(null);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "username") {
    // clear previous timeout
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // set new timeout
    typingTimeout.current = setTimeout(async () => {
      const valid = await checkUsername(value);
      if (!valid) {
        toast.error("Username already taken!");
        return; // don't save
      }

      setUserData({
        ...userData,
        [name]: value,
      });
    }, 500);
  } else {
    setUserData({
      ...userData,
      [name]: value,
    });
  }
};

  // Handle file input
  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0],
    });
  };

  const steps = [
    { label: 'Step 1', component: <FirstPage handleChange={handleChange} value={userData.username}/> },
    { label: 'Step 2', component: <SecondPage handleChange={handleChange} value={userData.displayName}/> },
    { label: 'Step 3', component: <ThirdPage handleChange={handleChange} value={userData.bio}/> },
    { label: 'Step 4', component: <LastPage handleFileChange={handleFileChange} pfp={userData.pfp}/> },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitData = async () => {
    try {
      const formData = new FormData();
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      const response = await fetch('http://localhost/React/eevent/src/BackEnd/src/ProgressData/ProgressData.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      toast.success(data.message || 'Data submitted successfully!');
      navigate('/dashBoard');
      
    } catch (error) {
      console.error(error);
      toast.error('Submission failed!');
    }
  };

  return (
    <div className='outer-div'>
      <div className="progress-container">
        {/* Progress bar */}
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div key={index} className="step-wrapper">
              <div className={`step ${index <= currentStep ? 'active' : ''}`}>
                <div className="step-number">{index < currentStep ? '✔' : index + 1}</div>
              </div>
              
              {index < steps.length - 1 && <div className={`connector ${index < currentStep ? 'active' : ''}`}></div>}
            </div>
          ))}
        </div>

        {/* Current step form */}
        <div className="current-step">
          <div className="form-box">
            {steps[currentStep].component}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="buttons">
          <button onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep}>Next</button>
          ) : (
            <button onClick={submitData}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectData;
