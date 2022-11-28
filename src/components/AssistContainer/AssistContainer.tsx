import React, { useEffect } from "react";
import animateSpike from "../../helper/animateSpike";

import "./AssistContainer.css";

type Props = {
  children: JSX.Element,
};

const AssistContainer: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    animateSpike("assistSpikeCanvas");
  }, []);

  return (
    <div className="assistContainer">
      <div id="assistSpike__container">
        <canvas id="assistSpikeCanvas"></canvas>
      </div>

      <div className="text">{children}</div>
    </div>
  );
};

export default AssistContainer;
