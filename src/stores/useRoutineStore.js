import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "fittracker-routines-session";

const RoutineSchema = z.object({
  id: z.string(),
  day: z.string().min(1, "요일을 선택하세요"),
  name: z.string(),
  time: z.coerce.number(),
  sets: z.coerce.number(),
  reps: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const chk = (data) => {
  const result = RoutineSchema.safeParse(data);
  return !result.success;
};

const useRoutineStore = create(
  persist(
    (set, get) => ({
      routines: [],

      // 새로운 루틴 추가
      addRoutine: (data) => {
        const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const routine = {
          ...data,
          id: uuidv4(),
          createdAt: now,
          updatedAt: now,
        };

        const result = RoutineSchema.safeParse(routine);
        if (!result.success) {
          console.error(
            `routine 데이터 유효성 검사 실패: ${result.error.format()}`
          );
          return;
        }

        set((state) => ({
          routines: [routine, ...state.routines],
        }));
      },

      // 루틴 수정
      updRoutine: (data) => {
        const routine = {
          ...data,
          updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };
        if (chk(routine)) {
          console.error("Invalid routine");
          return;
        }

        const { routines } = get();
        const spIdx = routines.findIndex((routine) => {
          return routine.id === data.id;
        });

        set((state) => ({
          routines: [
            ...state.routines.splice(0, spIdx),
            routine,
            ...state.routines.splice(spIdx + 1),
          ],
        }));
      },

      // 루틴 삭제
      delRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== id),
        })),

      getFilterRoutines: (day) => {
        const { routines } = get();
        if (day === "0") return routines;
        else
          return routines.filter(
            (routine) => String(routine.day) === String(day)
          );
      },
    }),
    {
      name: STORAGE_KEY, //sessionStorage Key 이름
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
);

export default useRoutineStore;
