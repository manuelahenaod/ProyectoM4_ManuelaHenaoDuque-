import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Task from "../pages/Task";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/tasks" element={<Task />} />
      </Route>

      {/* Ruta comodín para capturar cualquier ruta inexistente */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}