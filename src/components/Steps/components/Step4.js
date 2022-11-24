import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step4 = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    if (selectedEvents.length > 0) {
      tg.MainButton.setParams({
        text: "NEXT",
        color: "#04BEFE",
      });
    } else {
      tg.MainButton.setParams({
        text: "SKIP",
        color: "#8D9BD7",
      });
    }
  }, [selectedEvents, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    tg.onEvent("backButtonClicked", prevStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
      tg.offEvent("backButtonClicked", prevStep);
    };
  }, [nextStep, prevStep, tg]);

  const handleChange = useCallback(
    (value) => {
      const isChecked = value.checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedEvents(
            selectedEvents.filter((name) => value.name !== name)
          )
        : setSelectedEvents((prev) => [...prev, value.name]);
    },
    [selectedEvents]
  );

  const eventsList = [
    {
      name: "conference",
      hint: "short description about",
    },
    {
      name: "meetup",
      hint: "short description about",
    },
    {
      name: "workshop",
      hint: "short description about",
    },
    {
      name: "hackathon",
      hint: "short description about",
    },
  ];

  return (
    <>
      <AssistContainer>
        Time to be impressed!
        <br />
        Use our calendar for your upskill...
      </AssistContainer>

      {eventsList.map((event, index) => (
        <Checkbox
          key={index}
          name={event.name}
          label={event.name}
          hint={event.hint}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step4;
