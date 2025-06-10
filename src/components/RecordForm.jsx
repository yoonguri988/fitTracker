import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecordFormSchema } from "@/schema/RecordSchema";
import Button from "@/components/ui/Button";

export default function RecordForm({ defaultValues = {}, onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RecordFormSchema),
    defaultValues: {
      memo: defaultValues.memo || "",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 메모 */}
      <div>
        <label htmlFor="memo" className="block mb-1">
          🔥운동 메모
        </label>
        <textarea
          id="memo"
          placeholder="운동 일지를 기록해보세요"
          {...register("memo")}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.memo && (
          <p className="mt-1 text-sm text-red-500">{errors.memo.message}</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button type="submit">운동 완료 기록 저장</Button>
    </form>
  );
}
