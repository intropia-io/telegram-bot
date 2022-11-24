import React from "react";

import { useStepData, maxStepLength } from "../../state/stepState";

import "./StepNavigator.css";

const StepNavigator = (props) => {
  const step = useStepData();

  const stepsArray = Array.from(Array(maxStepLength));

  return (
    <div className={"StepNavigator " + props.className}>
      {stepsArray.map((el, index) => (
        <div
          key={index}
          className={`StepNavigator__step ${index + 1 <= step ? "passed" : ""} 
                ${index + 1 === step ? "current" : ""}`}
        />
      ))}
    </div>
  );
};

export default StepNavigator;
