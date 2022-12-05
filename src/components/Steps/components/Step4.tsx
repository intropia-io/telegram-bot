import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useSetForm, useFormData } from "state/formState";
import { useTypesData } from "state/typesState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step4 = () => {
  const formData = useFormData();
  const setForm = useSetForm();
  const typesData = useTypesData();

  const [selectedEvents, setSelectedEvents] = useState(
    formData.eventTypes || []
  );

  const { tg } = useTelegram();

  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, eventTypes: selectedEvents }));
      setStep(step + 1);
    }
  }, [step, setStep, setForm, selectedEvents]);

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

  useEffect(() => {
    setTitle("Events");
    setAssistContainer({
      visible: true,
      content: (
        <>
          Time to be impressed!
          <br />
          Use our calendar for your upskill...
        </>
      ),
    });
  }, [setTitle, setAssistContainer]);

  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      const isChecked = checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedEvents((prev) => [...prev, value])
        : setSelectedEvents(selectedEvents.filter((id) => value !== id));
    },
    [selectedEvents]
  );

  return (
    <>
      {typesData.eventsTypes.map((event, index) => (
        <Checkbox
          key={index}
          name={event.id}
          label={event.name}
          hint={event.description}
          checked={selectedEvents.includes(event.id)}
          onDataChange={handleChange}
        />
      ))}
    </>
  );
};

export default Step4;
