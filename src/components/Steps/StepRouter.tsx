import { useEffect } from "react";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import router from "router";

import { useTitleData } from "state/titleState";
import { useAssistContainerData } from "state/assistContainerState";

import StepNavigator from "components/StepNavigator/StepNavigator";
import AssistContainer from "components/AssistContainer/AssistContainer";

import { useSetDynasty } from "state/dynastyState";
import { useSetTypes } from "state/typesState";
import { CategoryType, ReffProgram, Type, UpdateFrequency } from "helper/enum";
import { useTelegram } from "hooks/useTelegram";
import { useSetForm } from "state/formState";

const StepRouter = () => {
  const title = useTitleData();
  const { visible, content } = useAssistContainerData();
  const setTypes = useSetTypes();
  const setDynasty = useSetDynasty();

  const setForm = useSetForm();

  const { user } = useTelegram();

  useEffect(() => {
    if (!user?.id) return;

    fetch(`https://rest.tr3butor.io/api/subscription/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.REACT_APP_BASIC_AUTH_CODE}`,
      },
    })
      .then((res) => res.json())
      .then(
        (data: {
          dynasties: {
            id: string;
          }[];
          questTypes: {
            id: string;
          }[];
          eventTypes: {
            id: string;
          }[];
          reffProgram: ReffProgram;
          updateFrequency: UpdateFrequency;
        }) => {
          const selectedDynasty = data.dynasties.map(
            (dynasty: { id: string }) => dynasty.id
          );
          const selectedQuestTypes = data.questTypes.map(
            (quest: { id: string }) => quest.id
          );

          const selectedEventTypes = data.eventTypes.map(
            (event: { id: string }) => event.id
          );

          setForm({
            dynasty: selectedDynasty,
            questTypes: selectedQuestTypes,
            eventTypes: selectedEventTypes,
            reffProgram: data.reffProgram,
            updateFrequency: data.updateFrequency,
          });
        }
      );
         // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <RouterProvider router={router} />
    </>
  );
};

export default StepRouter;
