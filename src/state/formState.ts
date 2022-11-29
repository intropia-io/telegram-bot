import { ReffProgram, UpdateFrequency } from "helper/enum";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const initialState = {
  dynasty: [] as string[],
  quests: [] as string[],
  events: [] as string[],
  reffProgram: ReffProgram.SUBSCRIBED,
  updateFrequency: UpdateFrequency.REALTIME,
};

export const formState = atom({
  key: "formState",
  default: initialState,
});

export const useSetForm = () => useSetRecoilState(formState);
export const useFormData = () => useRecoilValue(formState);
