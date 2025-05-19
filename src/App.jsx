import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RoutinePage from "./pages/RoutinePage";
import StatsPage from "./pages/StatsPage";
import RecordPage from "./pages/RecordPage";
import SettingsPage from "./pages/SettingsPage";
import Layout from "./components/Layout";

function App() {
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
  );
}

export default App;
