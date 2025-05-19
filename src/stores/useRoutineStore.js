import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const RoutineSchema = z.object({
  id: z.number(),
  day: z.string(),
  name: z.string(),
  time: z.number(),
  // sets: z.number(),
  // reps: z.number(),
  // description: z.string().optional(),
  // isActive: z.boolean(),
  // createdAt: z.string(),
});

const chk = (data) => {
  const result = RoutineSchema.safeParse(data);
  return !result.success;
};

const useRoutineStore = create(
  persist(
    (set) => ({
      routines: [],
      creRoutine: (routineData) => {
        const routine = { ...routineData, id: Date.now() };
        if (chk(routine)) {
          // 유효하지 않으면 추가하지 않음
          console.error("Invalid routine:", result.error.issues);
          return;
        }
        set((state) => ({
          routines: [routine, ...state.routines],
        }));
      },
      updRoutine: (routineData) => {
        const routine = { ...routineData, id: Date.now() };
        if (chk(routine)) {
          // 유효하지 않으면 변경되지 않음
          console.error("Invalid routine:", result.error.issues);
          return;
        }
      },
      delRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== id),
        })),
    }),
    {
      // name: "fittracker-routines", //localStorage Key 이름
      name: "fittracker-routines-session", //sessionStorage Key 이름
      storage: createJSONStorage(() => sessionStorage), //session일때만
    }
  )
);

export default useRoutineStore;
