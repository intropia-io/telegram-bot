import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useDynastyData } from "state/dynastyState";

import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";

import AssistContainer from "components/AssistContainer/AssistContainer";

import { useTelegram } from "hooks/useTelegram";
import Checkbox from "components/Checkbox/Checkbox";

const Step2 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();
  const dynastyData = useDynastyData();

  const [selectedDynasty, setSelectedDynasty] = useState(
    formData.dynasty || []
  );

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, dynasty: selectedDynasty }));
      setStep(step + 1);
    }
  }, [step, setStep, selectedDynasty, setForm]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    if (selectedDynasty.length > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [selectedDynasty, tg]);

  useEffect(() => {
    setTitle("Choose your dynasty");
    tg.MainButton.setParams({
      text: "NEXT",
      color: "#04BEFE",
    });
    tg.BackButton.show();
  }, [tg, setTitle]);

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
        ? setSelectedDynasty(
          selectedDynasty.filter((name) => value.name !== name)
        )
        : setSelectedDynasty((prev) => [...prev, value.name]);
    },
    [selectedDynasty]
  );

  if (!dynastyData) return null;

  return (
    <>
      <AssistContainer>
        We use dynasty instead typical categories. <br />
        Let’s review who are you (^--^)
      </AssistContainer>

      {dynastyData?.map((dynasty, index) => (
        <Checkbox
          key={index}
          name={dynasty.name}
          icon={dynasty.avatar}
          label={dynasty.name}
          hint={dynasty.description}
          checked={selectedDynasty.includes(dynasty.name)}
          onDataChange={(value) => {
            handleChange(value);
          }} />
      ))}
    </>
  );
};

export default Step2;
