import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const maxStepLength = 6;

const initialStep = 1;

export const stepState = atom({
  key: "stepStep",
  default: initialStep,
});

export const useSetStep = () => useSetRecoilState(stepState);
export const useStepData = () => useRecoilValue(stepState);
