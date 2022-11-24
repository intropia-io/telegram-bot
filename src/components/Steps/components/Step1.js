import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStageLength } from "state/stepState";

import ModalContainer from "../../ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

const Step1 = () => {
  const line1 = "Hey:) I’m Spike, tr3butor assistant.";
  const line2 = "I’ll help you to customize web3 opportunity feed";

  const [speechlines, setSpeechlines] = useState([line1]);

  const { tg, onToggleButton } = useTelegram();

  const stage = useStepData();
  const setStage = useSetStep();

  const nextStage = useCallback(() => {
    if (stage < maxStageLength) {
      setStage(stage + 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      tg.MainButton.setParams({
        text: "NEXT",
        color: "#04BEFE",
      });
      onToggleButton();
      setSpeechlines((prev) => [...prev, line2]);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tg.PopupParams.setParams({
      text: 'Welcome'
    })
  }, [tg])

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStage);
    return () => {
      tg.offEvent("mainButtonClicked", nextStage);
    };
  }, [nextStage, tg]);

  return (
    <ModalContainer>
      {speechlines.map((speechline, index) => (
        <div key={index}>
          <p>{speechline}</p>
        </div>
      ))}
    </ModalContainer>
  );
};

export default Step1;
