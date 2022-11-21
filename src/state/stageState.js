import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const maxStageLength = 6;

const initialStage = 1;

export const stageState = atom({
  key: "stageState",
  default: initialStage,
});

export const useSetStage = () => useSetRecoilState(stageState);
export const useStageData = () => useRecoilValue(stageState);
