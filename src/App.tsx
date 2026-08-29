import { Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import SubmissionPage from "./pages/SubmissionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses/:code" element={<Detail />} />
          <Route path="/submissions" element={<SubmissionPage />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}