import { Type } from "helper/enum";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const typesState = atom({
  key: "typesState",
  default: {
    questTypes: [] as Type[],
    eventsTypes: [] as Type[],
  },
});

export const useSetTypes = () => useSetRecoilState(typesState);
export const useTypesData = () => useRecoilValue(typesState);
