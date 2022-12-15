import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { maxStepLength, useSetStep, useStepData } from "state/stepState";
import { useSetForm, useFormData } from "state/formState";
import { useSetTitle } from "state/titleState";
import { useSetAssistContainer } from "state/assistContainerState";

import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";
import { ReffProgram } from "helper/enum";

const Step5 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();

  const [reffProgram, setReffProgram] = useState<ReffProgram>(
    formData.reffProgram
  );

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();
  const setAssistContainer = useSetAssistContainer();

  const navigate = useNavigate();

  const nextStep = useCallback(() => {
    if (step < maxStepLength) {
      setForm((prev) => ({ ...prev, reffProgram: reffProgram }));
      setStep(step + 1);
      navigate("/done");
    }
  }, [step, setStep, reffProgram, setForm, navigate]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
      navigate("/events");
    }
  }, [step, setStep, navigate]);

  useEffect(() => {
    if (step === 1) {
      navigate('/');
    }
  }, [navigate, step])

  useEffect(() => {
    tg.MainButton.setParams({
      text: "SAVE",
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
    setTitle("Referral recruitment");
    setAssistContainer({
      visible: true,
      content: (
        <>
          Help your favorite projects find the perfect candidate! Earn hefty
          rewards by referring your friends!
        </>
      ),
    });
  }, [setTitle, setAssistContainer]);

  return (
    <>
      <Checkbox
        checked={reffProgram === ReffProgram.SUBSCRIBED}
        label="yes, reward is cool!"
        hint="I'll be rewarded for bringing in talent"
        round
        onDataChange={(name: string, checked: boolean) => {
          const isChecked = checked;
          // do whatever you want with isChecked value
          isChecked && setReffProgram(ReffProgram.SUBSCRIBED);
        }}
        icon={undefined}
        background={undefined}
      />

      <Checkbox
        checked={reffProgram === ReffProgram.UNSUBSCRIBED}
        label="no"
        hint="everyone I know is already employed"
        round
        onDataChange={(name: string, checked: boolean) => {
          const isChecked = checked;
          // do whatever you want with isChecked value
          isChecked && setReffProgram(ReffProgram.UNSUBSCRIBED);
        }}
        icon={undefined}
        background={undefined}
      />
    </>
  );
};

export default Step5;
