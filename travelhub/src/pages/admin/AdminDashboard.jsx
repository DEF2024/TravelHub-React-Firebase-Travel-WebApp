import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listAllTrips, listCategories, listDestinations } from "../../services/destinationService";
import { listUsers } from "../../services/authService";

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      listDestinations({ includeUnpublished: true }),
      listCategories(),
      listUsers(),
      listAllTrips(),
    ]).then(([destinations, categories, users, trips]) => {
      if (active) {
        setCounts({
          destinations: destinations.length,
          categories: categories.length,
          users: users.length,
          trips: trips.length,
        });
      }
    }).catch((loadError) => {
      console.error("Unable to load CMS overview data.", loadError);
      if (active) setError("Unable to load CMS data. Check your admin account and Firestore rules.");
    });

    return () => { active = false; };
  }, []);

  return (
    <main className="portal-page admin-portal-page">
      <header className="portal-page-heading">
        <div>
          <p className="portal-eyebrow">TRAVELHUB CONTENT MANAGEMENT</p>
          <h1>CMS Overview</h1>
          <p>Manage destination content and monitor the TravelHub community.</p>
        </div>
      </header>

      {error && <p className="portal-error" role="alert">{error}</p>}
      {!counts && !error && <p className="portal-muted" role="status">Loading CMS overview…</p>}
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

      <section className="portal-content-panel">
        <div className="portal-section-heading">
          <div><p className="portal-eyebrow">ADMINISTRATION</p><h2>Choose a workspace</h2></div>
        </div>
        <div className="portal-quick-links">
          <Link to="/admin/destinations"><span aria-hidden="true">⌖</span><strong>Destinations CRUD</strong><small>Add places, update details, manage accessibility, and publish featured content.</small><span aria-hidden="true">→</span></Link>
          <Link to="/admin/trips"><span aria-hidden="true">▣</span><strong>Trips &amp; Users</strong><small>Review student plans, inspect itineraries, and browse registered users.</small><span aria-hidden="true">→</span></Link>
          <Link to="/admin/users"><span aria-hidden="true">♧</span><strong>Registered users</strong><small>View account profiles and assigned roles.</small><span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="portal-admin-note">
        <strong>Access control reminder</strong>
        <p>Admin access is determined by the user profile role. Configure Firestore security rules to enforce these permissions for database requests.</p>
      </section>
    </main>
  );
}
