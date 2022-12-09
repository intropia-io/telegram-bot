import { useCallback, useEffect } from "react";

import { maxStepLength, useSetStep, useStepData } from "state/stepState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

const Step1 = () => {
  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();

  const { tg, user } = useTelegram();
  console.log(user)

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    tg.MainButton.show();
    tg.MainButton.setParams({
      text: "NEXT",
      color: "#04BEFE",
    });
  }, [tg]);

  useEffect(() => {
    tg.setBackgroundColor("#141829");
    tg.setHeaderColor("bg_color");
  }, [tg]);

  useEffect(() => {
    setTitle("Welcome");
    setAssistContainer((prev) => ({ ...prev, visible: false }));
    tg.BackButton.hide();
  }, [tg, setTitle, setAssistContainer]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
    };
  }, [nextStep, tg]);

  return (
    <ModalContainer>
      <div>
        <p>Hey:) I’m Spike, tr3butor assistant.</p>
      </div>
      <div>
        <p>I’ll help you to customize web3 opportunity feed</p>
      </div>
    </ModalContainer>
  );
};

export default Step1;
