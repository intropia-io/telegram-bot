import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep } from "state/stepState";
import {
  updateFrequencyOptions,
  useFormData,
  useSetForm,
} from "state/formState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

import CheckedBadge from "assets/svg/checkedBadge.svg";
import Checkbox from "components/Checkbox/Checkbox";

const Step6 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const [updateFrequency, setUpdateFrequency] = useState(
    formData.updateFrequency
  );

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const finish = useCallback(() => {
    console.log(formData)
    tg.sendData(JSON.stringify(formData));
    // tg.close();
  }, [tg, formData]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, updateFrequency: updateFrequency }));
  }, [updateFrequency, setForm])

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Save",
      color: "#04BEFE",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", finish);
    tg.onEvent("backButtonClicked", prevStep);
    return () => {
      tg.offEvent("mainButtonClicked", finish);
      tg.offEvent("backButtonClicked", prevStep);
    };
  }, [prevStep, finish, tg]);

  return (
    <>
      <ModalContainer>
        <div>
          <img
            style={{ width: 40, margin: "0 auto" }}
            src={CheckedBadge}
            alt="checked"
          />
          <p>All done! You can change update frequency:</p>
        </div>
      </ModalContainer>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          aligmItems: "center",
          gap: 10,
        }}
      >
        <Checkbox
          checked={updateFrequencyOptions.realTime === updateFrequency}
          label="real time updates"
          background
          onChange={(value) => {
            const isChecked = value.checked;
            !isChecked && setUpdateFrequency(updateFrequencyOptions.realTime);
          }}
        />

        <Checkbox
          checked={updateFrequencyOptions.weekly === updateFrequency}
          label="weekly compilation"
          background
          onChange={(value) => {
            const isChecked = value.checked;
            !isChecked && setUpdateFrequency(updateFrequencyOptions.weekly);
          }}
        />
      </div>
    </>
  );
};

export default Step6;
