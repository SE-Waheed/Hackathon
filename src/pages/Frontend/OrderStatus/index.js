import React, { useState, useEffect } from 'react';
import ProgressBar from '../../../components/Progressbar';

const OrderStatus = () => {
  const steps = ['Submitted', 'Ready', 'Picked Up', 'On the Way', 'Delivered'];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        }
        return prevStep; 
      });
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval); 
  }, [steps.length]);

  return (
    <div>
      <h2>Order Status</h2>
      <ProgressBar currentStep={currentStep} steps={steps} />
    </div>
  );
};

export default OrderStatus;