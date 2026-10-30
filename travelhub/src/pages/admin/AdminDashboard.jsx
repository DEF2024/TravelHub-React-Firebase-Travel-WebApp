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
        <Link className="portal-primary-button" to="/admin/destinations">＋ Manage Destinations</Link>
      </header>

      {error && <p className="portal-error" role="alert">{error}</p>}
      {!counts && !error && <p className="portal-muted" role="status">Loading CMS overview…</p>}
      {counts && (
        <section className="portal-admin-stats" aria-label="CMS summary">
          <article><span>Total destinations</span><strong>{counts.destinations}</strong><small>{counts.destinations ? "Synced with Firestore" : "No destination records yet"}</small></article>
          <article><span>Student trips created</span><strong>{counts.trips}</strong><small>Across student explorers</small></article>
          <article><span>Registered users</span><strong>{counts.users}</strong><small>Student and admin accounts</small></article>
          <article><span>Destination categories</span><strong>{counts.categories}</strong><small>Available content filters</small></article>
        </section>
      )}

      <section className="portal-content-panel admin-workspace-grid" aria-label="Administration workspaces">
        <div className="portal-quick-links">
          <Link to="/admin/destinations"><span aria-hidden="true">⌖</span><strong>Destinations CRUD</strong><small>Add places, update details, manage accessibility, and publish featured content.</small><span aria-hidden="true">→</span></Link>
          <Link to="/admin/trips"><span aria-hidden="true">▣</span><strong>Trips &amp; Users</strong><small>Review student plans, inspect itineraries, and browse registered users.</small><span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="portal-admin-note">
        <strong>CMS Database Status</strong>
        <p>Firestore collections are connected and this overview updates when destination, category, user, and trip records change.</p>
      </section>
    </main>
  );
}
