import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { maxStepLength, useSetStep, useStepData } from "state/stepState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

const Step1 = () => {
  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const navigate = useNavigate();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setStep(step + 1);
      navigate("/dynasties");
    }
  }, [step, setStep, navigate]);

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
        <p>
          Hey there! I'm Spike. I’d like to know more about you so I can provide
          your with the most relevant offers.
        </p>
      </div>
      <div>
        <p>Let’s get started. It will only take a minute.</p>
      </div>
    </ModalContainer>
  );
};

export default Step1;
