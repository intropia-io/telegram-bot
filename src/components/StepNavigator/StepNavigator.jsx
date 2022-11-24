import React from "react";

import { useStepData, maxStepLength } from "../../state/stepState";

import "./StepNavigator.css";

const StepNavigator = (props) => {
  const stage = useStepData();

  const stagesArray = Array.from(Array(maxStepLength));

  return (
    <div className={"StepNavigator " + props.className}>
      {stagesArray.map((el, index) => (
        <div
          key={index}
          className={`StepNavigator__stage ${
            index + 1 <= stage ? "passed" : ""
          } 
                ${index + 1 === stage ? "current" : ""}`}
        />
      ))}
    </div>
  );
};

export default StepNavigator;
