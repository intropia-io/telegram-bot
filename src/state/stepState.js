import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const maxStageLength = 6;

const initialStage = 1;

export const stepStage = atom({
  key: "stepStage",
  default: initialStage,
});

export const useSetStep = () => useSetRecoilState(stepStage);
export const useStepData = () => useRecoilValue(stepStage);
