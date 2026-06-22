import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import AskPage from "./pages/AskPage";
import ChildProfilePage from "./pages/ChildProfilePage";
import { ChildProvider } from "./context/ChildContext";
import { ChatProvider } from "./context/ChatContext";
import StoriesPage from "./pages/StoriesPage";
import FavoriteStoriesPage from "./pages/FavoriteStoriesPage";

function App() {
  return (
    <ChildProvider>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="ask" element={<AskPage />} />
            <Route path="child-profile" element={<ChildProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="stories" element={<StoriesPage />} />
            <Route path="favorite-stories" element={<FavoriteStoriesPage />} />
          </Route>
        </Routes>
      </ChatProvider>
    </ChildProvider>
  );
}

export default App;