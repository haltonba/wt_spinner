import React, { useState, useEffect } from 'react';
import './Spinner.css';

const Spinner = () => {
  const [percent, setPercent] = useState(0);
  const [spinnerActive, setSpinnerActive] = useState(false);

  const handleStartStop = () => {
    setSpinnerActive(!spinnerActive)
  }

  const handleReset = () => {
    setSpinnerActive(false)
    setPercent(0)
  }

  useEffect(() => {
    let interval = null;
    if(percent < 100 && spinnerActive) {
        interval = setInterval(() => {
            setPercent(percent => percent + 1);
        }, 50);
    }
    else {
        setSpinnerActive(false)
        clearInterval(interval);
    }
      return () => clearInterval(interval)
  }, [percent, spinnerActive]);

  return (
    <div className="spinner-container">
        <div className={percent === 0 || percent === 100 ? "spinner-off" : "spinner-on"} style={spinnerActive ? {animationPlayState:"running"} : {animationPlayState:"paused"}}></div>
            <div className="num">
                {percent}%
            </div>
            <h2>{percent === 100 ? "You're done!" : percent === 0 ? "Ready to Upload?" : spinnerActive ? "Transferring..." : "Paused"}</h2>
            {percent === 100 ?  
            <button className="start-stop" onClick={handleReset}>Reset</button> :
            <button className="start-stop" onClick={handleStartStop}>{spinnerActive ? "Stop" : "Start"}</button>
            }
    </div>
  );
};

export default Spinner;