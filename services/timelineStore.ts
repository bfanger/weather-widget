import { create } from "zustand";

interface State {
  /** timestamp (milliseconds since the epoch) */
  time: number | undefined;
}
interface Actions {
  setTime: (time: number) => void;
}
export const useTimelineStore = create<State & Actions>((set) => {
  const state: State = { time: undefined };
  const actions: Actions = {
    setTime: (time) => {
      console.log(new Date(time));
      set({ time });
    },
  };
  return { ...state, ...actions };
});
