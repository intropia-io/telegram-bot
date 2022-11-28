import { useCallback, useEffect, useState } from "react";

import { maxStepLength, useSetStep, useStepData } from "state/stepState";
import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";
import React from "react";

const Step5 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();

  const [reffProgram, setReffProgram] = useState(formData.reffProgram);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, reffProgram: reffProgram }));
      setStep(step + 1);
    }
  }, [step, setStep, reffProgram, setForm]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "NEXT",
      color: "#04BEFE",
    });
  }, [tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStep);
    tg.onEvent("backButtonClicked", prevStep);
    return () => {
      tg.offEvent("mainButtonClicked", nextStep);
      tg.offEvent("backButtonClicked", prevStep);
    };
  }, [nextStep, prevStep, tg]);

  useEffect(() => {
    setTitle("Referral program");
  }, [setTitle]);

  return (
    <>
      <AssistContainer>
        tr3butor has a powerful referral program! <br />
        Real reward for your candidate! <br />
        Are you interested in?
      </AssistContainer>

      <Checkbox
        checked={reffProgram}
        label="yes, reward is cool!"
        hint="oh yeah, real cash direct to your wallet"
        round
        onChange={(value) => {
          const isChecked = value.checked;
          // do whatever you want with isChecked value
          !isChecked && setReffProgram(true);
        }} icon={undefined} background={undefined} />

      <Checkbox
        checked={!reffProgram}
        label="no"
        hint="so cute, dude"
        round
        onDataChange={(value) => {
          const isChecked = value.checked;
          // do whatever you want with isChecked value
          !isChecked && setReffProgram(false);
        }} icon={undefined} background={undefined} />
    </>
  );
};

export default Step5;
