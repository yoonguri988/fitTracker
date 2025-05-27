import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecordSchema } from "@/schema/RecordSchema";

const STORAGE_KEY = "fitTracker-record-session";

const useRecordStore = create(
  persist(
    (set, get) => ({
      records: [],
      // 날짜별 완료된 운동 기록
      completedRecords: [],
      // 운동 기록 저장 Action
      saveRecord: (date, record) => {},
      // 저장된 날짜 기록 불러오기
      loadRecord: (date) => {},

      // 초기 루틴 리스트 설정
      setRecords: (newRecords) => set({ records: newRecords }),

      // 특정 루틴의 완료 횟수 업데이트
      updReps: (id, reps) =>
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id
              ? {
                  ...record,
                  completedSets: record.completedSets + 1,
                  completedReps: [...record.completedReps, reps],
                }
              : record
          ),
        })),

      // 루틴 전체 초기화
      resetRecords: () => set({ records: [] }),

      // 단일 루틴 추가
      addRecord: (recordInput) => {
        const newRecord = {
          ...recordInput,
          id: uuidv4(),
          createdAt: new Date().toISOString().split("T")[0],
          completedSets: 0,
          completedReps: [],
        };
        const result = RecordSchema.safeParse(newRecord);

        if (!result.success) {
          console.error(
            `record 데이터 유효성 검사 실패: ${result.error.format()}`
          );
          return;
        }
        // 중첩된 set 제거
        set((state) => ({
          records: [newRecord, ...state.records],
        }));
      },

      // 루틴 하나 삭제하기
      delRecord: (id) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        }));
      },

      // 특정 루틴 가져오기
      getRecordById: (id) => {
        return get().records.find((record) => record.id === id);
      },
    }),
    {
      name: STORAGE_KEY, // 날짜별 기록을 저장하는 키
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

export default useRecordStore;
