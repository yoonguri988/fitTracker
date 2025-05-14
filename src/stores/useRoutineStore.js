import { create } from "zustand";

export const useRoutineStore = create((set) => ({
  routines: [],
  addRoutine: (day, exercise) =>
    set((state) => ({
      routines: [...state.routines, { day, exercises: [exercise] }],
    })),
}));
