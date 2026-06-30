import { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router";
import { LayoutDashboard, FileText, PlusCircle, LogOut, Menu, X, ChevronRight, Shield } from "lucide-react";
import { useAuth } from "../../../lib/authContext";
import { G, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";

const NAV = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard, end: true },
  { label: "All Posts",  href: "/admin/posts",      icon: FileText,        end: false },
  { label: "New Post",   href: "/admin/posts/new",  icon: PlusCircle,      end: false },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside style={{
      width: mobile ? "100%" : 240,
      background: "#0B1A2E",
      display: "flex",
      flexDirection: "column",
      height: mobile ? "auto" : "100vh",
      position: mobile ? "relative" : "sticky",
      top: 0,
      flexShrink: 0,
      borderRight: `1px solid rgba(255,255,255,0.05)`,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: G, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={16} color="#fff" />
          </div>
          <div>
            <p style={{ fontFamily: FONT_SERIF, fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>OMNI Admin</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <p style={{ fontFamily: FONT_SANS, fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.15em", padding: "0 8px", marginBottom: 8 }}>
          Blog Management
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10,
                  fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  background: isActive ? `${G}25` : "transparent",
                  border: isActive ? `1px solid ${G}35` : "1px solid transparent",
                  textDecoration: "none", transition: "all 0.2s ease",
                })}
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${G}30`, border: `1px solid ${G}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: "0.75rem", fontWeight: 700, color: G }}>
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email ?? "Admin"}
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)", cursor: "pointer",
            fontFamily: FONT_SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.15)";
            (e.currentTarget as HTMLElement).style.color = "#FCA5A5";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.25)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F7FD" }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 260, zIndex: 51 }}>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 60, background: "#fff", borderBottom: `1px solid ${SURF_BORDER}`,
          display: "flex", alignItems: "center", padding: "0 24px",
          justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <Menu size={20} color={TEXT1} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <a href="/" style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT3, textDecoration: "none" }}>Website</a>
              <ChevronRight size={12} color={TEXT3} />
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2 }}>Admin Panel</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="/blog"
              target="_blank"
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
                border: `1px solid ${SURF_BORDER}`, borderRadius: 8,
                fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2, textDecoration: "none",
              }}
            >
              View Blog ↗
            </a>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 28px", overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
