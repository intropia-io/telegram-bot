import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const updateFrequencyOptions = {
  realTime: "real time updates",
  weekly: "weekly compilation",
};

const initialState = {
  dynasty: [],
  quests: [],
  events: [],
  reffProgram: true,
  updateFrequency: updateFrequencyOptions.realTime,
};

export const formState = atom({
  key: "formState",
  default: initialState,
});

export const useSetForm = () => useSetRecoilState(formState);
export const useFormData = () => useRecoilValue(formState);
