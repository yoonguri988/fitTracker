import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RoutineSaveSchema } from "@/schema/RoutineSchema";

const STORAGE_KEY = "fittracker-routines-session";
const NOW = format(new Date(), "yyyy-MM-dd HH:mm:ss");

export const useRoutineStore = create(
  persist(
    (set, get) => ({
      routines: [],

      // 새로운 루틴 추가
      addRoutine: (data) => {
        const routine = {
          ...data,
          id: uuidv4(),
          createdAt: NOW,
          updatedAt: NOW,
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
      updateRoutine: (data) => {
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
      deleteRoutine: (id) =>
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
      resetRoutines: (day) => {
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

      // 자동 생성 트리거
      generateAutoRoutine: () => {
        const days = ["1", "2", "3", "4", "5", "6", "7"];
        const exercises = [
          { name: "스쿼트", time: 30, category: 2, sets: 3, reps: 12 },
          { name: "푸쉬업", time: 10, category: 0, sets: 3, reps: 15 },
          { name: "풀업", time: 10, category: 1, sets: 3, reps: 10 },
          { name: "플랭크", time: 5, category: 3, sets: 3, reps: 60 },
          { name: "런지", time: 30, category: 2, sets: 3, reps: 12 },
          { name: "딥스", time: 15, category: 6, sets: 3, reps: 10 },
          { name: "스트레칭", time: 30, category: 9, sets: 0, reps: 0 },
        ];

        const generatedRoutines = days.map((day, idx) => {
          return {
            id: uuidv4(),
            day,
            name: exercises[idx].name,
            category: exercises[idx].category,
            sets: exercises[idx].sets,
            reps: exercises[idx].reps,
            time: exercises[idx].time,
            createdAt: NOW,
            updatedAt: NOW,
          };
        });

        // 전체 루틴 스키마 유효성 검사
        const validRoutines = generatedRoutines.filter((routine) => {
          const result = RoutineSaveSchema.safeParse(routine);
          if (!result.success) {
            console.error(
              "자동 생성 루틴 유효성 검사 실패:",
              result.error.format()
            );
            return false;
          }
          return true;
        });

        // 상태 업데이트 한 번만
        set((state) => ({
          routines: [...validRoutines, ...state.routines],
        }));
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
