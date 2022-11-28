import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const typesState = atom({
  key: "typesState",
  default: {
    questTypes: [],
    eventsTypes: [],
  },
});

export const useSetTypes = () => useSetRecoilState(typesState);
export const useTypesData = () => useRecoilValue(typesState);
