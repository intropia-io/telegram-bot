import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStageLength } from "state/stepState";

import AssistContainer from "components/AssistContainer/AssistContainer";

import { useTelegram } from "hooks/useTelegram";
import Checkbox from "components/Checkbox/Checkbox";

import developmentBadge from "assets/svg/artistBadge.svg";
import designBadge from "assets/svg/designBadge.svg";
import managementBadge from "assets/svg/managementBadge.svg";
import marketingBadge from "assets/svg/marketingBadge.svg";
import artistBadge from "assets/svg/artistBadge.svg";

const Step2 = () => {
  const [selectedDynasty, setSelectedDynasty] = useState([]);

  const { tg } = useTelegram();

  const stage = useStepData();
  const setStage = useSetStep();

  const nextStage = useCallback(() => {
    console.log(setSelectedDynasty);
    if (stage < maxStageLength) {
      setStage(stage + 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    if (selectedDynasty.length > 0) {
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
  }, [selectedDynasty, tg.MainButton]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStage);
    return () => {
      tg.offEvent("mainButtonClicked", nextStage);
    };
  }, [nextStage, tg]);

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
        We use dynasty instead typical categories. Let’s review who are you
        (^--^)
      </AssistContainer>

      {dynastyList.map((dynasty, index) => (
        <Checkbox
          key={index}
          name={dynasty.name}
          icon={dynasty.icon}
          label={dynasty.name}
          hint={dynasty.hint}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step2;
