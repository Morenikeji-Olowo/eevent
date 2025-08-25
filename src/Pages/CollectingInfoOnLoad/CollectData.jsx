import React, { useState } from 'react';
import './CollectData.css';
import FirstPage from '../../Components/ProgressComponent/FirstPage/FirstPage';
import SecondPage from '../../Components/ProgressComponent/SecondPage/SecondPage';
import ThirdPage from '../../Components/ProgressComponent/ThirdPage/ThirdPage';
import LastPage from '../../Components/ProgressComponent/LastPage/LastPage';

const CollectData = () => {
  const [userData, setUserData] = useState({
    username: '',
    displayName: '',
    bio: '',
    pfp: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Handle text inputs
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
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

      const response = await fetch('http://localhost/eevent/src/BackEnd/src/ProgressData/ProgressData.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      alert(data.message || 'Data submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Submission failed!');
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
