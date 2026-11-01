import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { listSavedDestinations, setDestinationSaved } from "../services/destinationService";

const getRandomDestinationPrice = (destinationId = "") => {
  const seed = [...String(destinationId)].reduce((total, character) => total + character.charCodeAt(0), 0);
  return Math.round((seed % 24001 + 2000) / 100) * 100;
};

export default function Profile() {
  const { user, profile } = useAuth();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    try {
      setSaved(await listSavedDestinations(user.uid));
      setError("");
    } catch (loadError) {
      console.error("Unable to load saved destinations.", loadError);
      setError("Unable to load saved destinations. Check your Firestore rules and connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [user.uid]);

  const removeSaved = async (destination) => {
    try {
      await setDestinationSaved(user.uid, destination, false);
      setSaved((current) => current.filter((item) => item.id !== destination.id));
    } catch (removeError) {
      console.error("Unable to remove saved destination.", removeError);
      setError("Unable to remove this destination. Please try again.");
    }
  };

  return (
    <main className="planner-page">
      <section className="planner-container">
        <p className="planner-eyebrow">YOUR TRAVELHUB ACCOUNT</p>
        <h1 className="admin-page-title">{profile?.name || user.displayName || "Your profile"}</h1>
        <p className="admin-page-intro">{user.email}</p>
        <div className="profile-section-heading">
          <div>
            <h2>Saved destinations</h2>
            <p>Places you’ve saved while browsing.</p>
          </div>
          <Link className="planner-primary-button" to="/destinations">Explore destinations</Link>
        </div>
        {error && <p className="planner-error" role="alert">{error}</p>}
        {loading && <p role="status">Loading saved destinations…</p>}
        {!loading && !error && saved.length === 0 && <p className="planner-empty">You haven’t saved any destinations yet.</p>}
        <div className="saved-destination-grid">
          {saved.map((destination) => (
            <article className="planner-panel saved-destination-card" key={destination.id}>
              {destination.imageUrl && <img src={destination.imageUrl} alt="" />}
              <div>
                <h3>{destination.name}</h3>
                <p>{destination.region}</p>
              </div>
              <Link
                to="/payment"
                state={{
                  title: `${destination.name} travel plan`,
                  destination: `${destination.name}, ${destination.region}`,
                  duration: "7 days",
                  travelers: 1,
                  price: getRandomDestinationPrice(destination.id),
                }}
                className="saved-destination-price-button"
                aria-label={`Start planning ${destination.name} for ₹${getRandomDestinationPrice(destination.id).toLocaleString("en-IN")}`}
              >
                ₹{getRandomDestinationPrice(destination.id).toLocaleString("en-IN")}
              </Link>
              <button type="button" className="planner-danger-button" onClick={() => removeSaved(destination)}>Remove</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
