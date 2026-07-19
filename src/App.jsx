import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import AIAssistant from "./pages/AIAssistant";
import AIVision from "./pages/AIVision";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import TestEmail from "./pages/TestEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/test-email"element={<TestEmail />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/vision" element={<AIVision />} />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics/>
            </ProtectedRoute>} />
            
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;