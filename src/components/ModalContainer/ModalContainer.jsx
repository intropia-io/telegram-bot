import React, { useEffect } from "react";
import animateSpike from "../../helper/animateSpike";

import "./ModalContainer.css";

const ModalContainer = ({ children }) => {
  useEffect(() => {
    animateSpike("spikeCanvas");
  }, []);

  return (
    <div className="modalContainer">
      <div id="spike__container">
        <canvas id="spikeCanvas"></canvas>
      </div>

      <div className="text_content">{children}</div>
    </div>
  );
};

export default ModalContainer;
