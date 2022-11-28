import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const dynastyState = atom({
  key: "dynastyState",
  default: [],
});

export const useSetDynasty = () => useSetRecoilState(dynastyState);
export const useDynastyData = () => useRecoilValue(dynastyState);
