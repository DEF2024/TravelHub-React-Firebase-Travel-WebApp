import { useState } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/useAuth";

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
  const { user, profile, isAdmin } = useAuth();
  const { pathname } = useLocation();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const displayName = profile?.name || user?.displayName || user?.email?.split("@")[0] || "Traveler";
  const links = admin ? adminLinks : travelerLinks;

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Unable to sign out.", error);
      setLogoutError("Unable to sign out. Please try again.");
    }
  };

  return (
    <div className={`portal-shell${admin ? " portal-shell-admin" : " portal-shell-traveler"}`}>
      <header className="portal-topbar">
        <Link className="portal-brand" to="/home" aria-label="TravelHub home">
          <span className="portal-brand-mark" aria-hidden="true">◎</span>
          <span>
            <strong>TravelHub</strong>
            <small>STUDENT DISCOVERY &amp; ITINERARY</small>
          </span>
          {admin && <span className="portal-brand-tag">CMS</span>}
        </Link>

        <nav className="portal-discovery-nav" aria-label="TravelHub">
          <Link to="/home">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link className={!admin ? "portal-nav-current" : ""} to="/dashboard">Student Portal</Link>
          <Link to="/trips">My Trips</Link>
          {isAdmin ? (
            <Link className={admin ? "portal-nav-current" : ""} to="/admin">Admin CMS</Link>
          ) : (
            <span className="portal-nav-locked" aria-label="Admin CMS, administrator access required">Admin CMS <span aria-hidden="true">▣</span></span>
          )}
        </nav>

        <div className="portal-account">
          <span className="portal-role-badge">
            <span aria-hidden="true">{admin ? "⬡" : "✦"}</span>
            <span>Role:<strong>{isAdmin ? "admin" : "student"}</strong></span>
          </span>
          <button
            type="button"
            className="portal-account-toggle"
            aria-expanded={accountMenuOpen}
            aria-haspopup="menu"
            onClick={() => setAccountMenuOpen((open) => !open)}
          >
            <span className="portal-avatar" aria-hidden="true">{displayName.slice(0, 1).toUpperCase()}</span>
            <span className="portal-account-name">{displayName}</span>
            <span aria-hidden="true">⌄</span>
          </button>
          {accountMenuOpen && (
            <div className="portal-account-menu" role="menu">
              <div className="portal-account-summary">
                <strong>{displayName}</strong>
                <small>{user?.email}</small>
              </div>
              <p className="portal-account-menu-label">SWITCH PORTAL</p>
              <Link role="menuitem" to="/dashboard" onClick={() => setAccountMenuOpen(false)}>✦ <span>Student Portal</span></Link>
              {isAdmin ? (
                <Link role="menuitem" to="/admin" onClick={() => setAccountMenuOpen(false)}>⬡ <span>Admin CMS Portal</span></Link>
              ) : (
                <span className="portal-menu-disabled" aria-disabled="true">▣ <span>Admin CMS · Staff access only</span></span>
              )}
              <div className="portal-account-menu-divider" />
              <Link role="menuitem" to="/trips" onClick={() => setAccountMenuOpen(false)}>▣ <span>My Trips &amp; Itineraries</span></Link>
              <Link role="menuitem" to="/profile" onClick={() => setAccountMenuOpen(false)}>♧ <span>My Profile &amp; Saved Places</span></Link>
              <button type="button" role="menuitem" onClick={handleLogout}>↪ <span>Sign out</span></button>
            </div>
          )}
        </div>
      </header>

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
          {logoutError && <p className="portal-logout-error" role="alert">{logoutError}</p>}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
