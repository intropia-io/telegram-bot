import { useCallback, useEffect, useState } from "react";

import { maxStageLength, useSetStep, useStepData } from "state/stepState";

import AssistContainer from "components/AssistContainer/AssistContainer";
import Checkbox from "components/Checkbox/Checkbox";

import { useTelegram } from "hooks/useTelegram";

const Step5 = () => {
  const [ refToggle, setRefToggle ] = useState(true);

  const { tg } = useTelegram();

  const stage = useStepData();
  const setStage = useSetStep();

  const nextStage = useCallback(() => {
    if (stage < maxStageLength) {
      setStage(stage + 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    tg.MainButton.setParams({
        text: "NEXT",
        color: "#04BEFE",
      });
  }, [tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStage);
    return () => {
      tg.offEvent("mainButtonClicked", nextStage);
    };
  }, [nextStage, tg]);

  return (
    <>
      <AssistContainer>
        tr3butor has a powerful referral program! <br />
        Real reward for your candidate! <br />
        Are you interested in?
      </AssistContainer>

      <Checkbox
          checked={refToggle}
          label='yes, reward is cool!'
          hint='oh yeah, real cash direct to your wallet'
          onChange={   (value) => {
            const isChecked = value.checked;
            // do whatever you want with isChecked value
            !isChecked && setRefToggle(true);
          }}
        />

        <Checkbox
          checked={!refToggle}
          label='no'
          hint='so cute, dude'
          onChange={   (value) => {
            const isChecked = value.checked;
            // do whatever you want with isChecked value
            !isChecked && setRefToggle(false);
          }}
        />
    </>
  );
};

export default Step5;
