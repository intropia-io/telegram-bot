import { useCallback, useEffect, useState } from "react";

import { useFormData, useSetForm } from "state/formState";
import { useSetStep, useStepData } from "state/stepState";
import { useSetTitle } from "state/titleState";

import ModalContainer from "components/ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

import Checkbox from "components/Checkbox/Checkbox";
import { BotSubscriptionPost, UpdateFrequency } from "helper/enum";
import { useSetAssistContainer } from "state/assistContainerState";
import { useDynastyData } from "state/dynastyState";
import { useTypesData } from "state/typesState";

const CheckedBadge: string = require("assets/svg/checkedBadge.svg").default;

const Step6 = () => {
  const formData = useFormData();
  const setForm = useSetForm();

  const dynastyData = useDynastyData();
  const typesData = useTypesData();

  const setTitle = useSetTitle();
  const setAssistContainer = useSetAssistContainer();

  const [updateFrequency, setUpdateFrequency] = useState<UpdateFrequency>(
    formData.updateFrequency
  );

  const { tg, user } = useTelegram();

  const step = useStepData();
  const setStep = useSetStep();

  const finish = useCallback(async () => {
    if (user && user.id) {
      const formBody: BotSubscriptionPost = {
        userId: user.id.toString(),
        firstName: user.first_name as string,
        lastName: user.last_name as string,
        username: user.username as string,
        dynasty: formData.dynasty,
        questTypes: formData.questTypes,
        eventTypes: formData.eventTypes,
        reffProgram: formData.reffProgram,
        updateFrequency: formData.updateFrequency,
      };

      const selectedDynastyName = dynastyData
        .filter((dynasty) => formData.dynasty.includes(dynasty.id))
        .map((dynasty) => dynasty.name);

      const selectedQuestTypesName = typesData.questTypes
        .filter((questType) => formData.questTypes.includes(questType.id))
        .map((questType) => questType.name);

      const selectedEventTypesName = typesData.eventsTypes
        .filter((eventType) => formData.eventTypes.includes(eventType.id))
        .map((eventType) => eventType.name);

      try {
        await fetch("https://rest.tr3butor.io/api/subscription/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.REACT_APP_BASIC_AUTH_CODE}`,
          },
          body: JSON.stringify(formBody),
        }).then(() =>
          fetch("https://tgserver.tr3butor.io/send_feed", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dynasty: selectedDynastyName,
              questTypes: selectedQuestTypesName,
              eventTypes: selectedEventTypesName,
              reffProgram: formData.reffProgram,
              updateFrequency: formData.updateFrequency,
              user: {
                userId: user.id,
              },
            }),
          })
        ).then(() => tg.close());
      } catch (e) {
        console.error(e);
      }
    }
  }, [tg, formData, user, dynastyData, typesData]);

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
    setAssistContainer((prev) => ({ ...prev, visible: false }));
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img style={{ width: 40 }} src={CheckedBadge} alt="checked" />
          <p>All done!</p>
        </div>
      </ModalContainer>

      <p style={{ margin: "0 auto", fontWeight: 500 }}>
        You can change update frequency:
      </p>

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
          label="real time"
          background
          round
          onDataChange={(name: string, checked: boolean) => {
            const isChecked = checked;
            isChecked && setUpdateFrequency(UpdateFrequency.REALTIME);
          }}
        />

        <Checkbox
          checked={updateFrequency === UpdateFrequency.WEEKLY}
          label="weekly"
          background
          round
          onDataChange={(name: string, checked: boolean) => {
            const isChecked = checked;
            isChecked && setUpdateFrequency(UpdateFrequency.WEEKLY);
          }}
          hint={""}
        />

        <button onClick={finish}>test</button>
      </div>
    </>
  );
};

export default Step6;
