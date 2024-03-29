import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useDynastyData } from "state/dynastyState";

import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import { useTelegram } from "hooks/useTelegram";
import Checkbox from "components/Checkbox/Checkbox";
import SkeletonCardSteck from "components/Skeleton/SkeletonCardSteck";

const Step2 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();
  const dynastyData = useDynastyData();

  const [selectedDynasty, setSelectedDynasty] = useState<string[]>(
    formData.dynasty || []
  );

  const { tg } = useTelegram();

  const navigate = useNavigate();
  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, dynasty: selectedDynasty }));
      setStep(step + 1);
      navigate("/opportunities");
    }
  }, [step, setStep, selectedDynasty, setForm, navigate]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
      navigate("/welcome");
    }
  }, [step, setStep, navigate]);

  useEffect(() => {
    if (step === 1) {
      navigate("/");
    }
  }, [navigate, step]);

  useEffect(() => {
    if (selectedDynasty.length > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [selectedDynasty, tg]);

  useEffect(() => {
    setSelectedDynasty(formData.dynasty);
  }, [formData.dynasty]);

  useEffect(() => {
    document.title = "intropia bot dynasties";
    setTitle("Choose your dynasty");
    setAssistContainer({
      visible: true,
      content: (
        <>
          On our platform, we use the term "dynasties" to refer to skillsets or
          areas of expertise. <br />
          <br />
          Please select your dynasties to help us match you with relevant
          opportunities:
        </>
      ),
    });
    tg.MainButton.setParams({
      text: "SAVE",
      color: "#04BEFE",
    });
    tg.BackButton.show();
  }, [tg, setTitle, setAssistContainer]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    tg.onEvent("backButtonClicked", prevStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
      tg.offEvent("backButtonClicked", prevStep);
    };
  }, [nextStep, prevStep, tg]);

  const handleChange = useCallback(
    (value: string, checked: boolean) => {
      const isChecked = checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedDynasty((prev) => [...prev, value])
        : setSelectedDynasty(selectedDynasty.filter((id) => value !== id));
    },
    [selectedDynasty]
  );

  return (
    <>
      {dynastyData.length > 0 ? (
        dynastyData?.map((dynasty, index) => (
          <Checkbox
            key={index}
            name={dynasty.id}
            icon={dynasty.avatar}
            label={dynasty.name}
            hint={dynasty.description}
            checked={selectedDynasty.includes(dynasty.id)}
            onDataChange={handleChange}
          />
        ))
      ) : (
        <>
          <SkeletonCardSteck />
          <SkeletonCardSteck />
        </>
      )}
    </>
  );
};

export default Step2;
