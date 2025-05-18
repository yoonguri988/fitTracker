import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Title from "@/components/ui/Title";

function DashboardPage() {
  function handleClick() {
    alert("저장됨!");
  }

  return (
    <div>
      <Title>(예시) 오늘의 건강 상태</Title>
      <Card>
        <p>근육량: 20%</p>
        <p>체지방률: 29%</p>
      </Card>
      <Input label="메모 남기기" placeholder="오늘 운동은 어땠나요?" />
      <Button onClick={handleClick}>저장</Button>
    </div>
  );
}
export default DashboardPage;
