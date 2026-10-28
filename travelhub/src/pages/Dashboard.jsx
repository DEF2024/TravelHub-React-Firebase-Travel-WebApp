import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { listSavedDestinations, listUserTrips } from "../services/destinationService";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [trips, setTrips] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([listUserTrips(user.uid), listSavedDestinations(user.uid)])
      .then(([tripResults, savedResults]) => {
        if (!active) return;
        setTrips(tripResults);
        setSavedCount(savedResults.length);
      })
      .catch((loadError) => {
        console.error("Unable to load traveler dashboard.", loadError);
        if (active) setError("Unable to load your travel overview. Check your Firestore rules and connection.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [user.uid]);

  const today = new Date().toISOString().slice(0, 10);
  const upcomingTrips = trips.filter((trip) => trip.endDate >= today);
  const nextTrip = upcomingTrips[0];
  const displayName = profile?.name || user.displayName || user.email?.split("@")[0] || "Traveler";

  return (
    <main className="portal-page traveler-dashboard">
      <header className="portal-page-heading">
        <div>
          <p className="portal-eyebrow">YOUR TRAVEL WORKSPACE</p>
          <h1>Welcome back, {displayName}</h1>
          <p>Keep your plans, itineraries, and saved places together.</p>
        </div>
        <Link className="portal-primary-button" to="/trips">＋ Plan a trip</Link>
      </header>

      {error && <p className="portal-error" role="alert">{error}</p>}

      <section className="portal-stats-grid" aria-label="Your travel summary">
        <article className="portal-stat-card">
          <span className="portal-stat-icon" aria-hidden="true">▣</span>
          <span>Trips planned</span><strong>{loading ? "—" : trips.length}</strong>
          <Link to="/trips">Manage your trips →</Link>
        </article>
        <article className="portal-stat-card">
          <span className="portal-stat-icon" aria-hidden="true">✦</span>
          <span>Upcoming trips</span><strong>{loading ? "—" : upcomingTrips.length}</strong>
          <Link to="/trips">View itinerary plans →</Link>
        </article>
        <article className="portal-stat-card">
          <span className="portal-stat-icon" aria-hidden="true">♡</span>
          <span>Saved destinations</span><strong>{loading ? "—" : savedCount}</strong>
          <Link to="/profile">Open saved places →</Link>
        </article>
      </section>

      <section className="portal-content-panel">
        <div className="portal-section-heading">
          <div>
            <p className="portal-eyebrow">READY WHEN YOU ARE</p>
            <h2>{nextTrip ? "Your next trip" : "Start planning your next trip"}</h2>
          </div>
          <Link to="/trips">All trips →</Link>
        </div>
        {loading && <p className="portal-muted" role="status">Loading your plans…</p>}
        {!loading && nextTrip && (
          <article className="portal-next-trip">
            <div className="portal-trip-icon" aria-hidden="true">✈</div>
            <div className="portal-next-trip-copy">
              <span className="portal-trip-status">{nextTrip.startDate > today ? "Upcoming" : "In progress"}</span>
              <h3>{nextTrip.title}</h3>
              <p>{(nextTrip.destinationNames ?? []).join(" · ")}</p>
              <small>{nextTrip.startDate} – {nextTrip.endDate}</small>
            </div>
            <Link className="portal-secondary-button" to={`/trips/${nextTrip.id}`}>Open itinerary →</Link>
          </article>
        )}
        {!loading && !nextTrip && (
          <div className="portal-empty-state">
            <span aria-hidden="true">◎</span>
            <p>You haven’t planned a trip yet. Explore destinations or create your first itinerary.</p>
            <div>
              <Link className="portal-primary-button" to="/trips">Create a trip</Link>
              <Link className="portal-secondary-button" to="/destinations">Explore destinations</Link>
            </div>
          </div>
        )}
      </section>

      <section className="portal-quick-links" aria-label="Travel tools">
        <Link to="/destinations"><span aria-hidden="true">⌖</span><strong>Discover destinations</strong><small>Search places and find travel inspiration</small><span aria-hidden="true">→</span></Link>
        <Link to="/trips"><span aria-hidden="true">▤</span><strong>Build an itinerary</strong><small>Add activities and notes for every day</small><span aria-hidden="true">→</span></Link>
        <Link to="/profile"><span aria-hidden="true">♡</span><strong>Saved destinations</strong><small>Return to the places you love</small><span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
