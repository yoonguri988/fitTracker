import { format } from "date-fns";
import { getTime } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

export default function DailySummaryCard({ date, data = [] }) {
  const records = data.records ?? [];
  const totalTime = records.reduce((prev, cur) => {
    return (prev += Number(cur.time));
  }, 0);

  return (
    <Card className="max-w-md mx-auto p-4 shadow">
      <CardHeader className="border-b-2 pb-2 mb-2">
        <div>{format(date, "yyyy년 M월 d일")}</div>
        <div>{getTime(totalTime)}</div>
      </CardHeader>
      <CardContent className="space-y-2">
        {records.length > 0 ? (
          records.map((r) => {
            const zero = r.sets !== 0 && r.reps !== 0;
            return (
              <div key={r.id} className="flex justify-between gap-10">
                <div>{r.name}</div>
                {zero && (
                  <div>
                    {r.sets}세트 X {r.reps}회
                  </div>
                )}
                <div>{r.time}분</div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">오늘 완료된 운동이 없습니다.</p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div>{data.memo}</div>
      </CardFooter>
    </Card>
  );
}
