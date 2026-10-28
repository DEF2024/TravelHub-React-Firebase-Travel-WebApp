import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  createTrip,
  deleteTrip,
  listDestinations,
  listUserTrips,
  updateTrip,
} from "../services/destinationService";

const blankTrip = {
  title: "",
  destinationNames: [],
  startDate: "",
  endDate: "",
  notes: "",
};

export default function Trips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(blankTrip);
  const [editingId, setEditingId] = useState(null);
  const [additionalDestination, setAdditionalDestination] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setError("");
    try {
      const [tripResults, destinationResults] = await Promise.all([
        listUserTrips(user.uid),
        listDestinations(),
      ]);
      setTrips(tripResults);
      setDestinations(destinationResults);
    } catch (loadError) {
      console.error("Unable to load trips.", loadError);
      setError("Unable to load your trips. Check your Firestore rules and connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [user.uid]);

  const changeForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleDestination = (name) => {
    setForm((current) => ({
      ...current,
      destinationNames: current.destinationNames.includes(name)
        ? current.destinationNames.filter((destination) => destination !== name)
        : [...current.destinationNames, name],
    }));
  };

  const resetForm = () => {
    setForm(blankTrip);
    setEditingId(null);
    setAdditionalDestination("");
  };

  const addManualDestination = () => {
    const name = additionalDestination.trim();
    if (!name) return;
    setForm((current) => ({
      ...current,
      destinationNames: current.destinationNames.includes(name)
        ? current.destinationNames
        : [...current.destinationNames, name],
    }));
    setAdditionalDestination("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.endDate < form.startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }
    if (form.destinationNames.length === 0) {
      setError("Choose or add at least one destination.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) await updateTrip(editingId, form);
      else await createTrip(user.uid, form);
      resetForm();
      await refresh();
    } catch (saveError) {
      console.error("Unable to save trip.", saveError);
      setError("Unable to save this trip. Check your Firestore rules and try again.");
    } finally {
      setSaving(false);
    }
  };

  const editTrip = (trip) => {
    setForm({
      title: trip.title,
      destinationNames: trip.destinationNames ?? [],
      startDate: trip.startDate,
      endDate: trip.endDate,
      notes: trip.notes ?? "",
    });
    setEditingId(trip.id);
  };

  const removeTrip = async (trip) => {
    if (!window.confirm(`Delete "${trip.title}" and its itinerary?`)) return;
    setError("");
    try {
      await deleteTrip(trip.id);
      await refresh();
    } catch (deleteError) {
      console.error("Unable to delete trip.", deleteError);
      setError("Unable to delete this trip. Please try again.");
    }
  };

  return (
    <main className="planner-page">
      <section className="planner-container">
        <header className="planner-header">
          <div>
            <p className="planner-eyebrow">YOUR TRAVEL PLANS</p>
            <h1>My Trips</h1>
            <p>Create a trip, choose destinations, then build your day-by-day itinerary.</p>
          </div>
        </header>

        <form className="planner-form planner-panel" onSubmit={submit}>
          <h2>{editingId ? "Edit trip" : "Plan a new trip"}</h2>
          <div className="planner-fields">
            <label>
              Trip name
              <input name="title" value={form.title} onChange={changeForm} required maxLength={100} placeholder="Summer in Kerala" />
            </label>
            <label>
              Start date
              <input type="date" name="startDate" value={form.startDate} onChange={changeForm} required />
            </label>
            <label>
              End date
              <input type="date" name="endDate" value={form.endDate} onChange={changeForm} min={form.startDate} required />
            </label>
          </div>

          <fieldset className="planner-destination-picker">
            <legend>Destinations</legend>
            {destinations.length > 0 ? (
              <div className="planner-destination-options">
                {destinations.map((destination) => (
                  <label key={destination.id}>
                    <input
                      type="checkbox"
                      checked={form.destinationNames.includes(destination.name)}
                      onChange={() => toggleDestination(destination.name)}
                    />
                    {destination.name} <span>{destination.region}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p>No published destinations yet. You can add destinations below.</p>
            )}
            <div className="planner-manual-destination">
              <input
                value={additionalDestination}
                onChange={(event) => setAdditionalDestination(event.target.value)}
                placeholder="Add another destination"
                aria-label="Add another destination"
              />
              <button type="button" className="planner-secondary-button" onClick={addManualDestination}>Add</button>
            </div>
            {form.destinationNames.length > 0 && (
              <p className="planner-selection">Selected: {form.destinationNames.join(", ")}</p>
            )}
          </fieldset>

          <label>
            Notes
            <textarea name="notes" value={form.notes} onChange={changeForm} rows={3} maxLength={1000} placeholder="Anything you want to remember while planning?" />
          </label>
          {error && <p className="planner-error" role="alert">{error}</p>}
          <div className="planner-form-actions">
            {editingId && <button type="button" className="planner-secondary-button" onClick={resetForm}>Cancel edit</button>}
            <button type="submit" className="planner-primary-button" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save trip" : "Create trip"}
            </button>
          </div>
        </form>

        <section className="planner-trip-list" aria-labelledby="trips-heading">
          <h2 id="trips-heading">Your trips</h2>
          {loading && <p role="status">Loading trips…</p>}
          {!loading && trips.length === 0 && <p className="planner-empty">You haven’t planned a trip yet.</p>}
          <div className="planner-trip-grid">
            {trips.map((trip) => (
              <article className="planner-panel planner-trip-card" key={trip.id}>
                <p className="planner-trip-dates">{trip.startDate} – {trip.endDate}</p>
                <h3>{trip.title}</h3>
                <p>{(trip.destinationNames ?? []).join(" · ")}</p>
                {trip.notes && <p className="planner-trip-notes">{trip.notes}</p>}
                <div className="planner-trip-actions">
                  <Link className="planner-primary-button" to={`/trips/${trip.id}`}>Open itinerary</Link>
                  <button type="button" className="planner-secondary-button" onClick={() => editTrip(trip)}>Edit</button>
                  <button type="button" className="planner-danger-button" onClick={() => removeTrip(trip)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
