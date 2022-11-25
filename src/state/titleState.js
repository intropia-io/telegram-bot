import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const titleState = atom({
  key: "titleState",
  default: "Welcome",
});

export const useSetTitle = () => useSetRecoilState(titleState);
export const useTitleData = () => useRecoilValue(titleState);
