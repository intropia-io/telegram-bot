import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStepLength } from "state/stepState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step3 = () => {
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

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
