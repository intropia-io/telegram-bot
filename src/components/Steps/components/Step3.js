import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStageLength } from "state/stepState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step3 = () => {
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);

  const { tg } = useTelegram();

  const stage = useStepData();
  const setStage = useSetStep();

  const nextStage = useCallback(() => {
    if (stage < maxStageLength) {
      setStage(stage + 1);
    }
  }, [stage, setStage]);

  const prevStage = useCallback(() => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    if (selectedOpportunities.length > 0) {
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
  }, [selectedOpportunities, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStage);
    tg.onEvent("backButtonClicked", prevStage);
    return () => {
      tg.offEvent("mainButtonClicked", nextStage);
      tg.offEvent("backButtonClicked", prevStage);
    };
  }, [nextStage, prevStage, tg]);

  const handleChange = useCallback(
    (value) => {
      const isChecked = value.checked;
      // do whatever you want with isChecked value
      isChecked
        ? setSelectedOpportunities(
            selectedOpportunities.filter((name) => value.name !== name)
          )
        : setSelectedOpportunities((prev) => [...prev, value.name]);
    },
    [selectedOpportunities]
  );

  const opportunitiesList = [
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

      {opportunitiesList.map((opportunity, index) => (
        <Checkbox
          key={index}
          name={opportunity.name}
          label={opportunity.name}
          hint={opportunity.hint}
          onChange={(value) => {
            handleChange(value);
          }}
        />
      ))}
    </>
  );
};

export default Step3;
