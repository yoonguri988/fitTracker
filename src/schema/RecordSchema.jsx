import { z } from "zod";
import { RoutineSchema } from "@/schema/RoutineSchema";

// 날짜 형식 정규표현식
const dateKeyRegex = /^\d{4}-\d{2}-\d{2}$/;

// 실제 유효한 날짜인지 검사하는 함수
const isValidDate = (dateStr) => {
  if (!dateKeyRegex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date) && date.toISOString().split("T")[0] === dateStr;
};

const dayEntrySchema = z.object({
  records: z.array(RoutineSchema),
  memo: z.string().optional(),
});

// 전용 폼 schema
export const RecordFormSchema = z.object({
  memo: z.string().max(200).optional(),
});

// 전체 객체 schema
export const RecordSchema = z
  .record(z.string(), dayEntrySchema)
  .refine((obj) => Object.keys(obj).every(isValidDate), {
    message: "모든 키는 유효한 yyyy-mm-dd 형식의 실제 날짜여야 합니다.",
  });
