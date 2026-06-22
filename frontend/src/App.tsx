import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import AskPage from "./pages/AskPage";
import ChildProfilePage from "./pages/ChildProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ask" element={<AskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="child-profile" element={<ChildProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;