import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useTypesData } from "state/typesState";
import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step3 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();
  const typesData = useTypesData();

  const [selectedQuests, setSelectedQuests] = useState<string[]>(
    formData.questTypes || []
  );

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, questTypes: selectedQuests }));

      setStep(step + 1);
    }
  }, [step, setStep, selectedQuests, setForm]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    if (selectedQuests.length > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [selectedQuests, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    tg.onEvent("backButtonClicked", prevStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
      tg.offEvent("backButtonClicked", prevStep);
    };
  }, [nextStep, prevStep, tg]);

  useEffect(() => {
    setTitle("Opportunities");
    setAssistContainer({
      visible: true,
      content: (
        <>
          tr3butor collects all possible oportunities. <br />
          What is your best match?
        </>
      ),
    });
  }, [setTitle, setAssistContainer]);

  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      const isChecked = checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedQuests((prev) => [...prev, value])
        : setSelectedQuests(selectedQuests.filter((id) => value !== id));
    },
    [selectedQuests]
  );

  return (
    <>
      {typesData.questTypes.map((type, index) => (
        <Checkbox
          key={index}
          name={type.id}
          label={type.name}
          hint={type.description}
          checked={selectedQuests.includes(type.id)}
          onDataChange={handleChange}
        />
      ))}
    </>
  );
};

export default Step3;
