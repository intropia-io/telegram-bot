import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";

import ModalContainer from "../../ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

const Step1 = () => {
  const line1 = "Hey:) I’m Spike, tr3butor assistant.";
  const line2 = "I’ll help you to customize web3 opportunity feed";

  const [speechlines, setSpeechlines] = useState([line1]);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    tg.MainButton.hide();
    const timeout = setTimeout(() => {
      tg.MainButton.setParams({
        text: "NEXT",
        color: "#04BEFE",
      });
      tg.MainButton.show();
      setSpeechlines((prev) => [...prev, line2]);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [tg]);

  useEffect(() => {
    tg.setBackgroundColor("#141829");
    tg.setHeaderColor("bg_color");
  }, [tg]);

  useEffect(() => {
    tg.BackButton.hide();
  }, [tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
    };
  }, [nextStep, tg]);

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
