import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useSetForm, useFormData } from "state/formState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step3 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

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

  const QuestsList = [
    {
      name: "full-time",
      hint: "short description about",
    },
    {
      name: "grant",
      hint: "short description about",
    },
    {
      name: "bounty",
      hint: "short description about",
    },
  ];

  return (
    <>
      <AssistContainer>
        tr3butor collects all possible oportunities. <br />
        What is your best match?
      </AssistContainer>

      {QuestsList.map((opportunity, index) => (
        <Checkbox
          key={index}
          name={opportunity.name}
          label={opportunity.name}
          hint={opportunity.hint}
          checked={selectedQuests.includes(opportunity.name)}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step3;
