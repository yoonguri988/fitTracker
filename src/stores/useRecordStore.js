import { RecordSchema } from "@/schema/RecordSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "fitTracker-record-session";

/**
 * @description 운동 기록 저장용 상태 저장소
 * - records: 날짜별 저장된 루틴 기록
 *   - key: 'yyyy-mm-dd', value: routine id 배열
 * - completedRoutines: 현재 체크된 루틴들
 */

export const useRecordStore = create(
  persist(
    (set, get) => ({
      records: {}, // key: 'yyyy-mm-dd', value: 완료된 routine 객체 배열
      completedRoutines: [], // 오늘 체크한 루틴 id 배열

      // 체크 여부 토글
      toggleCompleted: (id) => {
        const current = get().completedRoutines;
        const exists = current.includes(id);
        set({
          completedRoutines: exists
            ? current.filter((rid) => rid !== id)
            : [...current, id],
        });
      },

      // 체크 여부 확인
      isCompleted: (id) => get().completedRoutines.includes(id),

      // 날짜별 운동 기록 저장
      saveRecordForToday: (date, items, memo, force = false) => {
        const current = get().records;

        // 이미 저장되어 있고 강제 저장이 아닐 경우 return
        if (current[date] && !force) return;

        // 체크된 루틴만 필터링
        const completedItems = items.filter((item) =>
          get().isCompleted(item.id)
        );

        const updated = {
          ...current,
          [date]: {
            records: completedItems,
            memo,
          },
        };

        const result = RecordSchema.safeParse(updated);
        if (!result.success) {
          console.error(`record 데이터 저장 실패: ${result.error.format()}`);
          return;
        }

        set({ records: updated });
      },

      // 이미 저장된 날짜인지 확인
      isAlreadySaved: (date) => {
        return Boolean(get().records[date]);
      },
    }),
    {
      name: STORAGE_KEY,
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
