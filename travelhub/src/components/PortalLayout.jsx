import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";

const travelerLinks = [
  { to: "/dashboard", label: "Overview", icon: "⌂", end: true },
  { to: "/trips", label: "My Trips & Itineraries", icon: "▣" },
  { to: "/profile", label: "Saved Destinations", icon: "♡" },
];

const adminLinks = [
  { to: "/admin", label: "CMS Overview", icon: "▦", end: true },
  { to: "/admin/destinations", label: "Destinations CRUD", icon: "⌖" },
  { to: "/admin/trips", label: "Trips & Users", icon: "♧" },
];

export default function PortalLayout({ admin = false }) {
  const { isAdmin } = useAuth();
  const { pathname } = useLocation();
  const links = admin ? adminLinks : travelerLinks;

  return (
    <div className={`portal-shell${admin ? " portal-shell-admin" : " portal-shell-traveler"}`}>
      <Navbar />

      <div className="portal-frame">
        <aside className="portal-sidebar">
          <div className="portal-sidebar-label">
            <strong><span aria-hidden="true">{admin ? "⬡" : "✦"}</span> {admin ? "CMS STAFF PORTAL" : "TRAVELER PORTAL"}</strong>
            <small>{admin ? "TravelHub Admin" : "Your travel workspace"}</small>
          </div>
          <nav className="portal-sidebar-nav" aria-label={admin ? "Admin navigation" : "Traveler navigation"}>
            {links.map(({ to, label, icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `portal-sidebar-link${isActive || (admin && to === "/admin/trips" && pathname === "/admin/users") ? " is-active" : ""}`}
              >
                <span aria-hidden="true">{icon}</span>{label}
              </NavLink>
            ))}
          </nav>
          <Link className="portal-sidebar-return" to={admin ? "/dashboard" : "/home"}>
            <span aria-hidden="true">←</span> {admin ? "Return to User Dashboard" : "Back to TravelHub"}
          </Link>
        </aside>

        <div className="portal-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
