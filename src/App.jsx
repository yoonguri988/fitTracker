import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RoutinePage from "./pages/RoutinePage";
import StatsPage from "./pages/StatsPage";
import RecordPage from "./pages/RecordPage";
import SettingsPage from "./pages/SettingsPage";
import Layout from "./components/Layout";
// import useCounterStore from "./stores/useCounterStore";
// import './App.css'

function App() {
  // const count = useCounterStore((state) => state.count);
  // const increase = useCounterStore((state) => state.increase);
  // const decrease = useCounterStore((state) => state.decrease);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="routine" element={<RoutinePage />} />
        <Route path="record" element={<RecordPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
    // <>
    //   <div className="bg-red-500 text-white p-4 text-xl">
    //     Tailwind 적용 성공!
    //   </div>
    //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //     <h1 className="text-2xl font-bold mb-4">Zustand 상태 테스트</h1>
    //     <p className="text-xl mb-4">Count: {count}</p>
    //     <div>
    //       <button
    //         onClick={increase}
    //         className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
    //       >
    //         증가
    //       </button>
    //       <button
    //         onClick={decrease}
    //         className="bg-red-500 text-white px-4 py-2 rounded"
    //       >
    //         감소
    //       </button>
    //     </div>
    //   </div>
    // </>
  );
}

export default App;
