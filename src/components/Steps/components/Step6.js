import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep } from "state/stepState";
import { updateFrequencyOptions, useFormData, useSetForm } from "state/formState";


import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

import CheckedBadge from "assets/svg/checkedBadge.svg";
import Checkbox from "components/Checkbox/Checkbox";

const Step6 = () => {
  const [updateFrequency, setUpdateFrequency] = useState(
    updateFrequencyOptions.realTime
  );

  const { tg } = useTelegram();

  const formData = useFormData();
  const setForm = useSetForm();

  const stage = useStepData();
  const setStage = useSetStep();

  const finish = useCallback(() => {
    setForm(prev => [prev, ...{updateFrequency}])
    console.log(formData)
    // tg.close();
  }, [tg, formData, setForm, updateFrequency]);

  const prevStage = useCallback(() => {
    if (stage > 1) {
      setStage(stage - 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Save",
      color: "#04BEFE",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", finish);
    tg.onEvent("backButtonClicked", prevStage);
    return () => {
      tg.offEvent("mainButtonClicked", finish);
      tg.offEvent("backButtonClicked", prevStage);
    };
  }, [prevStage, finish, tg]);

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
