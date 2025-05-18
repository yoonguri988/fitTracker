import { z } from "zod";
import { create } from "zustand";

const RoutineSchema = z.object({
  id: z.number(),
  name: z.string(),
  // description: z.string().optional(),
  // isActive: z.boolean(),
  // createdAt: z.string(),
});

const useRoutineStore = create((set) => ({
  routines: [],
  addRoutine: (routineData) => {
    const routine = { ...routineData, id: Date.now() };
    const result = RoutineSchema.safeParse(routine);
    if (!result.success) {
      // 유효하지 않으면 추가하지 않음
      console.error("Invalid routine:", result.error.issues);
      return;
    }
    set((state) => ({
      routines: [routine, ...state.routines],
    }));
  },
  removeRoutine: (id) =>
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== id),
    })),
}));

export default useRoutineStore;
