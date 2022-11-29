import { Dynasty } from "helper/enum";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const dynastyState = atom({
  key: "dynastyState",
  default: [] as Dynasty[],
});

export const useSetDynasty = () => useSetRecoilState(dynastyState);
export const useDynastyData = () => useRecoilValue(dynastyState);
