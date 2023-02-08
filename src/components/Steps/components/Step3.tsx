import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useTypesData } from "state/typesState";
import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";
import SkeletonCardSteck from "components/Skeleton/SkeletonCardSteck";

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
  const navigate = useNavigate();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, questTypes: selectedQuests }));

      setStep(step + 1);

      navigate("/events");
    }
  }, [step, setStep, selectedQuests, setForm, navigate]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
    navigate("/dynasties");
  }, [step, setStep, navigate]);

  useEffect(() => {
    if (step === 1) {
      navigate("/");
    }
  }, [navigate, step]);

  useEffect(() => {
    if (selectedQuests.length > 0) {
      tg.MainButton.setParams({
        text: "SAVE",
        color: "#04BEFE",
      });
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
    document.title = "intropia bot opportunities";
    setTitle("Opportunities");
    setAssistContainer({
      visible: true,
      content: <>Choose your challenge and kick off your web3 career:</>,
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
      {typesData.questTypes.length > 0 ? (
        typesData.questTypes.map((type, index) => (
          <Checkbox
            key={index}
            name={type.id}
            label={type.name}
            hint={type.description}
            checked={selectedQuests.includes(type.id)}
            onDataChange={handleChange}
          />
        ))
      ) : (
        <SkeletonCardSteck />
      )}
    </>
  );
};

export default Step3;
