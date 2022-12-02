import { ReffProgram, UpdateFrequency } from "helper/enum";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const initialState = {
  dynasty: [] as string[],
  questTypes: [] as string[],
  eventTypes: [] as string[],
  reffProgram: ReffProgram.SUBSCRIBED,
  updateFrequency: UpdateFrequency.REALTIME,
};

export const formState = atom({
  key: "formState",
  default: initialState,
});

export const useSetForm = () => useSetRecoilState(formState);
export const useFormData = () => useRecoilValue(formState);
