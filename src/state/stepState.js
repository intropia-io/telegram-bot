import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const maxStepLength = 6;

const initialStep = 2;

export const stepStep = atom({
  key: "stepStep",
  default: initialStep,
});

export const useSetStep = () => useSetRecoilState(stepStep);
export const useStepData = () => useRecoilValue(stepStep);
