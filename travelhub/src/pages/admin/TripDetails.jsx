import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTrip, listItineraryItems } from "../../services/destinationService";

export default function AdminTripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([getTrip(tripId), listItineraryItems(tripId)])
      .then(([tripResult, itineraryResults]) => {
        if (!active) return;
        setTrip(tripResult);
        setItems(itineraryResults);
      })
      .catch((loadError) => {
        console.error("Unable to load the trip itinerary for admin review.", loadError);
        if (active) setError("Unable to load this itinerary. Check your admin account and Firestore rules.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [tripId]);

  return (
    <main className="portal-page">
      <Link className="portal-back-link" to="/admin">← Back to trips &amp; users</Link>
      {loading && <p className="portal-muted" role="status">Loading itinerary…</p>}
      {error && <p className="portal-error" role="alert">{error}</p>}
      {!loading && !error && !trip && <p className="portal-empty-state">This trip could not be found.</p>}
      {!loading && !error && trip && (
        <>
          <header className="portal-page-heading">
            <div>
              <p className="portal-eyebrow">STUDENT ITINERARY · READ ONLY</p>
              <h1>{trip.title || "Untitled trip"}</h1>
              <p>{trip.startDate} – {trip.endDate} · {(trip.destinationNames ?? []).join(" · ") || "No destinations"}</p>
            </div>
          </header>
          {trip.notes && <section className="portal-content-panel portal-trip-notes"><h2>Trip notes</h2><p>{trip.notes}</p></section>}
          <section className="portal-content-panel">
            <div className="portal-section-heading">
              <div><h2>Daily itinerary</h2><p>{items.length} {items.length === 1 ? "activity" : "activities"}</p></div>
            </div>
            {items.length === 0 ? <p className="portal-empty-state">No activities have been added to this trip.</p> : (
              <div className="portal-itinerary-list">
                {items.map((item) => (
                  <article className="portal-itinerary-item" key={item.id}>
                    <time dateTime={item.date}>{item.date}</time>
                    <div><h3>{item.activity}</h3>{item.notes && <p>{item.notes}</p>}</div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
