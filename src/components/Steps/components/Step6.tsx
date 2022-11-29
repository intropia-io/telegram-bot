import React, { useCallback, useEffect, useState } from "react";

import { useFormData, useSetForm } from "state/formState";
import { useSetStep, useStepData } from "state/stepState";
import { useSetTitle } from "state/titleState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

import Checkbox from "components/Checkbox/Checkbox";
import { UpdateFrequency } from "helper/enum";

const CheckedBadge: string = require("assets/svg/checkedBadge.svg").default;

const Step6 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const setTitle = useSetTitle();

  const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequency>(
    formData.updateFrequency
  );

  console.log(updateFrequency);

  const { tg } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const finish = useCallback(() => {
    tg.sendData(JSON.stringify(formData));
    tg.close();
  }, [tg, formData]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, updateFrequency: updateFrequency }));
  }, [updateFrequency, setForm]);

  useEffect(() => {
    setTitle("All done");
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
          alignItems: "center",
          gap: 10,
        }}
      >
        <Checkbox
          checked={updateFrequency === UpdateFrequency.REALTIME}
          label="real time updates"
          background
          round
          onDataChange={(name: string, checked: boolean) => {
            const isChecked = checked;
            isChecked && setUpdateFrequency(UpdateFrequency.REALTIME);
          }}
        />

        <Checkbox
          checked={updateFrequency === UpdateFrequency.WEEKLY}
          label="weekly compilation"
          background
          round
          onDataChange={(name: string, checked: boolean) => {
            const isChecked = checked;
            isChecked && setUpdateFrequency(UpdateFrequency.WEEKLY);
          }}
          hint={""}
        />
      </div>
    </>
  );
};

export default Step6;
