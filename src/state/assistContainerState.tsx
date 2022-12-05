import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const assistContainerState = atom({
  key: "assistContainerState",
  default: {
    visible: false,
    content: <></>,
  },
});

export const useSetAssistContainer = () =>
  useSetRecoilState(assistContainerState);
export const useAssistContainerData = () =>
  useRecoilValue(assistContainerState);
