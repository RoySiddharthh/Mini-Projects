import React, { useState } from "react";
import "./styles.css";

function StepProgressBar() {
  const btnArray = new Array(5).fill(null);
  console.log(btnArray.length);

  const [step, setStep] = useState(0);

  function handlePrevClick() {
    setStep((step) => Math.max(step - 1, -1));
    const btnElement = document.getElementById(step);

    console.log(step, btnElement);

    if (btnElement.classList.contains("active")) {
      console.log("removed");
      btnElement.classList.remove("active");
    }
  }
  function handleNextClick() {
    setStep((step) => Math.min(step + 1, btnArray.length - 1));
    const btnElement = document.getElementById(step);
    console.log(btnElement, step);

    if (btnElement.classList.contains("active")) {
      console.log("Class has been added");
    } else {
      btnElement.classList.add("active");
      console.log("Class has now been added");
    }
  }
  return (
    <React.Fragment>
      <div className="step-progress-bar-container">
        <h1>Step Progress Bar</h1>
        <div className="progress-bar-btns">
          {btnArray.map((item, index) => {
            return (
              <button
                id={index}
                key={index}
                type="button"
                className={`btns ${index <= step ? `active` : ``}`}
              >
                Step {index + 1}
              </button>
            );
          })}
        </div>
        <div className="command-btns">
          <button
            disabled={step === 0 ? true : false}
            type="text"
            className="prev-btn"
            onClick={() => {
              handlePrevClick();
            }}
          >
            Previous
          </button>
          <button
            disabled={step === btnArray.length - 1 ? true : false}
            type="text"
            className="next-btn"
            onClick={(event) => {
              handleNextClick(event.target.value);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StepProgressBar;
