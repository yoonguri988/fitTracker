import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RoutineSaveSchema } from "@/schema/RoutineSchema";

const STORAGE_KEY = "fittracker-routines-session";

export const useRoutineStore = create(
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
          sets: data.sets === "" ? 0 : data.sets,
          reps: data.reps === "" ? 0 : data.reps,
        };

        const result = RoutineSaveSchema.safeParse(routine);
        if (!result.success) {
          console.error(`routine 데이터 저장 실패: ${result.error.format()}`);
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

        const result = RoutineSaveSchema.safeParse(routine);
        if (!result.success) {
          console.error(`routine 데이터 수정 실패: ${result.error.format()}`);
          return;
        }

        const { routines } = get();
        const spIdx = routines.findIndex((routine) => {
          return routine.id === data.id;
        });

        set((state) => ({
          routines: [
            ...state.routines.slice(0, spIdx),
            routine,
            ...state.routines.slice(spIdx + 1),
          ],
        }));
      },

      // 루틴 삭제
      delRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter((routine) => routine.id !== id),
        })),

      // 요일별 해당 루틴 표시
      getFilterRoutines: (day) => {
        const { routines } = get();
        if (day === "0") return routines;
        else
          return routines.filter(
            (routine) => String(routine.day) === String(day)
          );
      },
      // 현재 주간 루틴 초기화 (모든 요일의 운동 제거)
      initialRoutines: (day) => {
        if (day === "0") {
          set((state) => ({
            routines: [],
          }));
        } else {
          set((state) => ({
            routines: state.routines.filter(
              (r) => String(r.day) !== String(day)
            ),
          }));
        }
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
