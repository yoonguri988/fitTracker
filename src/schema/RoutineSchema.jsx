import { z } from "zod";

export const RoutineSchema = z.object({
  id: z.string(),
  day: z.string().min(1, "요일은 필수 입력입니다."),
  name: z
    .string()
    .min(1, "이름은 필수 입력입니다.")
    .max(20, "최대 20자 입니다."),
  category: z.coerce.number(),
  time: z.coerce.number().max(999, "최대 999분 입니다."),
  sets: z.coerce.number().max(99, "최대 99세트 입니다."),
  reps: z.coerce.number().max(99, "최대 99회 입니다."),
});

export const RoutineSaveSchema = z.object({
  id: z.string(),
  day: z.string(),
  name: z.string(),
  category: z.coerce.number(),
  time: z.coerce.number(),
  sets: z.coerce.number(),
  reps: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
