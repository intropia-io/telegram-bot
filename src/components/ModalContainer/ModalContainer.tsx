import React, { useEffect } from "react";
import animateSpike from "../../helper/animateSpike";

import "./ModalContainer.css";

type Props = {
  children: React.ReactNode;
};

const ModalContainer: React.FC<Props> = ({ children }) => {
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
