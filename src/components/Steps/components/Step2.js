import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";
import { useSetForm, useFormData } from "state/formState";

import AssistContainer from "components/AssistContainer/AssistContainer";

import { useTelegram } from "hooks/useTelegram";
import Checkbox from "components/Checkbox/Checkbox";

import developmentBadge from "assets/svg/artistBadge.svg";
import designBadge from "assets/svg/designBadge.svg";
import managementBadge from "assets/svg/managementBadge.svg";
import marketingBadge from "assets/svg/marketingBadge.svg";
import artistBadge from "assets/svg/artistBadge.svg";

const Step2 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

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
    tg.MainButton.setParams({
      text: "NEXT",
      color: "#04BEFE",
    });
    tg.BackButton.show();
  }, [tg]);

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

  const dynastyList = [
    {
      name: "development",
      hint: "create web app and JS frameworks",
      icon: developmentBadge,
    },
    {
      name: "design",
      hint: "UX/UI creator, graphic design",
      icon: designBadge,
    },
    {
      name: "management",
      hint: "you are a moderator of your team",
      icon: managementBadge,
    },
    {
      name: "marketing",
      hint: "you promote product and setup socials",
      icon: marketingBadge,
    },
    {
      name: "artist",
      hint: "you change this visible world",
      icon: artistBadge,
    },
  ];

  return (
    <>
      <AssistContainer>
        We use dynasty instead typical categories. <br />
        Let’s review who are you (^--^)
      </AssistContainer>

      {dynastyList.map((dynasty, index) => (
        <Checkbox
          key={index}
          name={dynasty.name}
          icon={dynasty.icon}
          label={dynasty.name}
          hint={dynasty.hint}
          checked={selectedDynasty.includes(dynasty.name)}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step2;
