import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listAllTrips,
  listCategories,
  listDestinations,
} from "../../services/destinationService";
import { listUsers } from "../../services/authService";

const getTripStatus = (trip, today) => {
  if (trip.endDate < today) return "Completed";
  if (trip.startDate <= today) return "In progress";
  return "Upcoming";
};

export default function AdminTripsUsers() {
  const [counts, setCounts] = useState(null);
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("trips");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userQuery, setUserQuery] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      listDestinations({ includeUnpublished: true }),
      listCategories(),
      listUsers(),
      listAllTrips(),
    ]).then(([destinations, categories, userResults, tripResults]) => {
      if (!active) return;
      setCounts({
        destinations: destinations.length,
        categories: categories.length,
        users: userResults.length,
        trips: tripResults.length,
      });
      setUsers(userResults);
      setTrips(tripResults);
    }).catch((loadError) => {
      console.error("Unable to load admin dashboard data.", loadError);
      if (active) setError("Unable to load CMS data. Check your admin account and Firestore rules.");
    }).finally(() => {
      if (active) setLoading(false);
    });

    return () => { active = false; };
  }, []);

  const userById = new Map(users.map((user) => [user.id, user]));
  const today = new Date().toISOString().slice(0, 10);
  const visibleUsers = users.filter((user) => `${user.name ?? ""} ${user.email ?? ""} ${user.university ?? ""}`
    .toLocaleLowerCase()
    .includes(userQuery.trim().toLocaleLowerCase()));

  return (
    <main className="portal-page admin-portal-page">
      <header className="portal-page-heading">
        <div>
          <p className="portal-eyebrow">TRAVELHUB CONTENT MANAGEMENT</p>
          <h1>Trips &amp; User Accounts Overview</h1>
          <p>Staff monitoring of student itineraries and registered accounts.</p>
        </div>
      </header>

      {error && <p className="portal-error" role="alert">{error}</p>}

      {counts && (
        <section className="portal-admin-stats" aria-label="CMS summary">
          {Object.entries(counts).map(([label, count]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{count}</strong>
            </article>
          ))}
        </section>
      )}

      <div className="admin-overview-toolbar">
        <div className="portal-tabs" role="tablist" aria-label="Admin account overview">
        <button
          type="button"
          role="tab"
          id="admin-trips-tab"
          aria-selected={activeTab === "trips"}
          aria-controls="admin-overview-panel"
          className={activeTab === "trips" ? "is-active" : ""}
          onClick={() => setActiveTab("trips")}
        >
          <span aria-hidden="true">▣</span> All Student Trips ({counts?.trips ?? "…"})
        </button>
        <button
          type="button"
          role="tab"
          id="admin-users-tab"
          aria-selected={activeTab === "users"}
          aria-controls="admin-overview-panel"
          className={activeTab === "users" ? "is-active" : ""}
          onClick={() => setActiveTab("users")}
        >
          <span aria-hidden="true">♧</span> Registered Users ({counts?.users ?? "…"})
        </button>
        </div>
        {activeTab === "users" && (
          <label className="admin-user-search">
            <span aria-hidden="true">⌕</span>
            <input value={userQuery} onChange={(event) => setUserQuery(event.target.value)} placeholder="Search users" />
          </label>
        )}
      </div>

      <section
        className="portal-content-panel portal-admin-table-panel"
        id="admin-overview-panel"
        role="tabpanel"
        aria-labelledby={activeTab === "trips" ? "admin-trips-tab" : "admin-users-tab"}
      >
        {activeTab === "trips" ? (
          <>
            <div className="portal-section-heading">
              <div><h2>Student trips</h2><p>Review trip plans and inspect their itineraries.</p></div>
              <Link to="/admin/users">View all users →</Link>
            </div>
            {loading && <p className="portal-muted" role="status">Loading trips…</p>}
            {!loading && trips.length === 0 && <p className="portal-empty-state">No trips have been created yet.</p>}
            {!loading && trips.length > 0 && (
              <div className="portal-table-scroll">
                <table className="portal-table">
                  <thead><tr><th>Trip title</th><th>Destination</th><th>Dates</th><th>Student</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {trips.map((trip) => {
                      const owner = userById.get(trip.ownerId ?? trip.userId);
                      const status = getTripStatus(trip, today);
                      return (
                        <tr key={trip.id}>
                          <td>{trip.title || "Untitled trip"}</td>
                          <td><span className="portal-destination-cell"><span aria-hidden="true">⌖</span>{(trip.destinationNames ?? []).join(", ") || "—"}</span></td>
                          <td><time dateTime={trip.startDate}>{trip.startDate}</time><span className="portal-date-separator"> → </span><time dateTime={trip.endDate}>{trip.endDate}</time></td>
                          <td>{owner?.name || owner?.email || "Unknown student"}</td>
                          <td><span className={`portal-status portal-status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span></td>
                          <td><Link className="portal-table-action" to={`/admin/trips/${trip.id}`}>Inspect itinerary →</Link></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="portal-section-heading">
              <div><h2>Registered users</h2><p>Accounts currently registered in TravelHub.</p></div>
              <Link to="/admin/users">Full user details →</Link>
            </div>
            {loading && <p className="portal-muted" role="status">Loading users…</p>}
            {!loading && users.length === 0 && <p className="portal-empty-state">No user profiles found.</p>}
            {!loading && users.length > 0 && (
              <div className="portal-table-scroll">
                <table className="portal-table">
                  <thead><tr><th>User</th><th>Email</th><th>University</th><th>Role</th></tr></thead>
                  <tbody>
                    {visibleUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name || "—"}</td><td>{user.email || "—"}</td>
                        <td>{user.university || "—"}</td>
                        <td><span className="portal-status">{user.role || "user"}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
