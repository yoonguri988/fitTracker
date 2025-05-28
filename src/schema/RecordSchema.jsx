import { z } from "zod";

export const RecordSchema = z.object({
  date: z.string(),
  routines: z.array(CompletedRoutineSchema).optional(),
  fatigue: z.number().min(1).max(5), // 날짜별 피로도 값
  // completedReps: z.array(z.number()).optional(),
  // completedSets: z.number().optional(),
  // createdAt: z.string().min(1, "생성일자는 필수입니다."),
});
