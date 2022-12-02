import React, { useMemo } from "react";
import { useStepData } from "state/stepState";
import { useTitleData } from "state/titleState";

import StepNavigator from "components/StepNavigator/StepNavigator";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import { useTelegram } from "hooks/useTelegram";

const StepRouter = () => {
  const step = useStepData();
  const title = useTitleData();
  const {tg} = useTelegram();

  const stepComponent = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      default:
        return <h2>{step}</h2>;
    }
  }, [step]);

  console.log(tg)

  return (
    <>
      <StepNavigator title={title} className={undefined} />
      {stepComponent}
    </>
  );
};

export default StepRouter;
