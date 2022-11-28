import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useTypesData  } from "state/typesState";
import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step3 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();
  const typesData = useTypesData();

  const [selectedQuests, setSelectedQuests] = useState(formData.quests || []);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, quests: selectedQuests }));

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
  }, [setTitle]);

  const handleChange = useCallback(
    (value) => {
      const isChecked = value.checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedQuests(
            selectedQuests.filter((name) => value.name !== name)
          )
        : setSelectedQuests((prev) => [...prev, value.name]);
    },
    [selectedQuests]
  );

  return (
    <>
      <AssistContainer>
        tr3butor collects all possible oportunities. <br />
        What is your best match?
      </AssistContainer>

      {typesData.questTypes.map((type, index) => (
        <Checkbox
          key={index}
          name={type.name}
          label={type.name}
          hint={type.description}
          checked={selectedQuests.includes(type.name)}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step3;
