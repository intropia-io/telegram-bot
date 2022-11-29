import React from "react";

import { useStepData, maxStepLength } from "../../state/stepState";

import "./StepNavigator.css";

type Props = {
  className?: string;
  title?: string;
};

const StepNavigator: React.FC<Props> = ({ className, title }) => {
  const step = useStepData();

  const stepsArray = Array.from(Array(maxStepLength));

  return (
    <div className={"StepNavigator " + className}>
      {title && <h3>{title}</h3>}
      <div className="row">
        {stepsArray.map((el, index) => (
          <div
            key={index}
            className={`StepNavigator__step ${
              index + 1 <= step ? "passed" : ""
            } 
                ${index + 1 === step ? "current" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepNavigator;
