import  { useEffect, useMemo } from "react";
import { useStepData } from "state/stepState";
import { useTitleData } from "state/titleState";
import { useAssistContainerData } from "state/assistContainerState";

import StepNavigator from "components/StepNavigator/StepNavigator";
import AssistContainer from "components/AssistContainer/AssistContainer";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import axios from "axios";
import { useSetDynasty } from "state/dynastyState";
import { useSetTypes } from "state/typesState";
import { CategoryType, Type } from "helper/enum";
import { useTelegram } from "hooks/useTelegram";

const StepRouter = () => {
  const step = useStepData();
  const title = useTitleData();
  const { visible, content } = useAssistContainerData();
  const setTypes = useSetTypes();
  const setDynasty = useSetDynasty();

  const { user } = useTelegram();

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

  useEffect(() => {
    fetch(`https://rest.tr3butor.io/api/subscription/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.REACT_APP_BASIC_AUTH_CODE}`,
      },
    }).then((res) => console.log(res));
  }, []);

  useEffect(() => {
    axios.get(`https://rest.tr3butor.io/api/type`).then((res) => {
      const types = res.data;
      const questTypes: Type[] = [];
      const eventsTypes: Type[] = [];
      types.forEach((type: Type) => {
        if (type.categoryType === CategoryType.QUEST) {
          questTypes.push(type);
        } else if (type.categoryType === CategoryType.EVENT) {
          eventsTypes.push(type);
        }
      });
      setTypes({ questTypes: questTypes, eventsTypes: eventsTypes });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.get(`https://rest.tr3butor.io/api/dynasty`).then((res) => {
      const dynasty = res.data;
      setDynasty(dynasty);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StepNavigator title={title} className={undefined} />
      {visible && <AssistContainer>{content}</AssistContainer>}
      {stepComponent}
    </>
  );
};

export default StepRouter;
