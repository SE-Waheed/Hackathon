// Filename: ProgressBar.js
import React from 'react';

const ProgressBar = ({ currentStep, steps }) => {
  const totalSteps = steps.length;

  return (
    <div style={styles.container}>
      {steps.map((step, index) => (
        <div key={index} style={styles.stepContainer}>
          <div
            style={{
              ...styles.step,
              backgroundColor: index <= currentStep ? '#4caf50' : '#e0e0e0',
              width: `${(100 / totalSteps)}%`,
            }}
          />
          <div style={styles.label}>{step}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '30px',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  stepContainer: {
    flex: 1,
    position: 'relative',
  },
  step: {
    height: '100%',
    transition: 'background-color 0.3s ease',
  },
  label: {
    position: 'absolute',
    top: '5px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
    color: '#000',
  },
};

export default ProgressBar;