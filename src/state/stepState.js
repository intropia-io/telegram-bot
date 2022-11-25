import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const maxStepLength = 6;

const initialStep = 5;

export const stepStep = atom({
  key: "stepStep",
  default: initialStep,
});

export const useSetStep = () => useSetRecoilState(stepStep);
export const useStepData = () => useRecoilValue(stepStep);
