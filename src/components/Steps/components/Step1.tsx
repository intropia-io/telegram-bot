import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useSetDynasty } from "state/dynastyState";
import { maxStepLength, useSetStep, useStepData } from "state/stepState";
import { useSetTitle } from "state/titleState";
import { useSetTypes } from "state/typesState";
import { useSetAssistContainer } from "state/assistContainerState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";
import { Type } from "helper/enum";

const Step1 = () => {
  const categoryTypes = {
    quest: "QUEST",
    event: "EVENT",
  };
  const line1 = "Hey:) I’m Spike, tr3butor assistant.";
  const line2 = "I’ll help you to customize web3 opportunity feed";

  const setTitle = useSetTitle();
  const setTypes = useSetTypes();
  const setDynasty = useSetDynasty();
  const setAssistContainer = useSetAssistContainer();

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
    axios.get(`https://rest.tr3butor.io/api/type`).then((res) => {
      const types = res.data;
      const questTypes: Type[] = [];
      const eventsTypes: Type[] = [];
      types.forEach((type: Type) => {
        if (type.categoryType === categoryTypes.quest) {
          questTypes.push(type);
        } else if (type.categoryType === categoryTypes.event) {
          eventsTypes.push(type);
        }
      });
      setTypes({ questTypes: questTypes, eventsTypes: eventsTypes });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.get(`https://rest.tr3butor.io/api/dynasty`).then((res) => {
      const dynasty = res.data;
      setDynasty(dynasty);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {speechlines.map((speechline, index) => (
        <div key={index}>
          <p>{speechline}</p>
        </div>
      ))}
    </ModalContainer>
  );
};

export default Step1;
