import React, { useState } from "react"
import './progressBar.css'

const ProgressBar = () => {

    const [currentStep, setCurrentStep] = useState(0);
    
    const steps = [
        {label: 'Personal'},
        {label: 'Documents'},
        {label: 'Review'},
        {label: 'Professional'},
    ];
    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }

    }
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
        
    }
    return (
        <div className="progress-container">
            <div className="progress-bar">
                {steps.map((step, index) => (
                    <div key={index} className="step-container">
                        <div className={`step ${index <= currentStep ? 'active' : ''}`}>
                        <div className="step-number">
                            
                            { index < currentStep ? '✔' : index + 1}
                        </div>
                        <div className="label">
                            {step.label}
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`connector ${index < currentStep ? 'active' : ''}`}>

                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="buttons">
                <button onClick={prevStep} disabled= {currentStep === 0}>Previous</button>
                <button onClick={nextStep} disabled= {currentStep === steps.length -1}>Next</button>
            </div>
        </div>
    )
}
export default ProgressBar