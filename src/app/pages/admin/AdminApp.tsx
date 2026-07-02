import { Navigate, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "../../../lib/authContext";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import PostList from "./PostList";
import PostEditor from "./PostEditor";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F7FD" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #1351C830", borderTopColor: "#1351C8", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login"  element={<AdminLogin />} />
      <Route path="signup" element={<AdminSignup />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/new" element={<PostEditor />} />
        <Route path="posts/:id/edit" element={<PostEditor />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}
