import { FunctionComponent, ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon";
import styles from "./AppLayout.module.css";

type AppLayoutProps = { children: ReactNode };

const navItems = [
  { icon: "home" as const, label: "Accueil", path: "/dashboard" },
  { icon: "calendar" as const, label: "Planning", path: "/planning" },
  {
    icon: "assignment" as const,
    label: "Missions",
    path: "/planning-en-cours",
  },
  { icon: "add-task" as const, label: "Nouvelle", path: "/missions" },
  { icon: "bar-chart" as const, label: "Rapports", path: "/rapports" },
];

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* ── Barre mobile haut ── */}
      <div className={styles.mobileTopBar}>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="menu" size={24} color="#fff" />
        </button>
        <span className={styles.mobileTitle}>Azur Levage</span>
        <button
          className={styles.mobileAdd}
          onClick={() => handleNav("/missions")}
        >
          <Icon name="add" size={22} color="#fff" />
        </button>
      </div>

      {/* ── Overlay mobile ── */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
          mobileOpen ? styles.mobileVisible : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logo} onClick={() => handleNav("/dashboard")}>
            <div className={styles.logoIcon}>
              <Icon name="construction" size={20} color="var(--azur-navy)" />
            </div>
            {!collapsed && <span className={styles.logoName}>Azur Levage</span>}
          </div>
          <button
            className={styles.collapseBtn}
            onClick={() => {
              setCollapsed(!collapsed);
              setMobileOpen(false);
            }}
          >
            <Icon name="menu" size={20} color="rgba(255,255,255,0.5)" />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                onClick={() => handleNav(item.path)}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color={
                    isActive ? "var(--azur-navy)" : "rgba(255,255,255,0.55)"
                  }
                />
                {!collapsed && (
                  <span className={styles.navLabel}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userAvatar}>
            <Icon
              name="account-circle"
              size={32}
              color="rgba(255,255,255,0.4)"
            />
            {!collapsed && (
              <div className={styles.userInfo}>
                <span className={styles.userName}>Admin</span>
                <span className={styles.userRole}>Superviseur</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default AppLayout;
