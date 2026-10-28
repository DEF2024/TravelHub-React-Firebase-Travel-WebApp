import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createItineraryItem,
  deleteItineraryItem,
  getTrip,
  listItineraryItems,
  updateItineraryItem,
} from "../services/destinationService";

const blankItem = { date: "", activity: "", notes: "" };

export default function Itinerary() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(blankItem);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setError("");
    try {
      const currentTrip = await getTrip(tripId);
      setTrip(currentTrip);
      setItems(currentTrip ? await listItineraryItems(tripId) : []);
    } catch (loadError) {
      console.error("Unable to load itinerary.", loadError);
      setError("Unable to load this trip. Check your Firestore rules and connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [tripId]);

  const cancelEdit = () => {
    setForm(blankItem);
    setEditingId(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (form.date < trip.startDate || form.date > trip.endDate) {
      setError("Choose a date within this trip’s date range.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) await updateItineraryItem(tripId, editingId, form);
      else await createItineraryItem(tripId, form);
      cancelEdit();
      await refresh();
    } catch (saveError) {
      console.error("Unable to save itinerary activity.", saveError);
      setError("Unable to save this activity. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const beginEdit = (item) => {
    setEditingId(item.id);
    setForm({ date: item.date, activity: item.activity, notes: item.notes ?? "" });
  };

  const remove = async (item) => {
    if (!window.confirm(`Remove "${item.activity}" from the itinerary?`)) return;
    setError("");
    try {
      await deleteItineraryItem(tripId, item.id);
      await refresh();
    } catch (deleteError) {
      console.error("Unable to delete itinerary activity.", deleteError);
      setError("Unable to delete this activity. Please try again.");
    }
  };

  if (loading) return <main className="planner-page"><p role="status">Loading itinerary…</p></main>;
  if (error && !trip) return <main className="planner-page"><p className="planner-error" role="alert">{error}</p></main>;
  if (!trip) return <main className="planner-page"><p className="planner-empty">This trip could not be found.</p><Link to="/trips">Back to trips</Link></main>;

  return (
    <main className="planner-page">
      <section className="planner-container">
        <Link className="planner-back-link" to="/trips">← Back to trips</Link>
        <header className="planner-header itinerary-page-header">
          <div>
            <p className="planner-eyebrow">DAILY PLAN</p>
            <h1>{trip.title}</h1>
            <p>{trip.startDate} – {trip.endDate} · {(trip.destinationNames ?? []).join(" · ")}</p>
          </div>
        </header>

        <form className="planner-form planner-panel" onSubmit={submit}>
          <h2>{editingId ? "Edit activity" : "Add an activity"}</h2>
          <div className="planner-fields">
            <label>
              Date
              <input
                type="date"
                value={form.date}
                min={trip.startDate}
                max={trip.endDate}
                onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                required
              />
            </label>
            <label className="planner-field-wide">
              Activity
              <input
                value={form.activity}
                onChange={(event) => setForm((current) => ({ ...current, activity: event.target.value }))}
                maxLength={120}
                placeholder="Visit the tea gardens"
                required
              />
            </label>
          </div>
          <label>
            Notes
            <textarea
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              rows={3}
              maxLength={1000}
              placeholder="Add details, reminders, or meeting points"
            />
          </label>
          {error && <p className="planner-error" role="alert">{error}</p>}
          <div className="planner-form-actions">
            {editingId && <button type="button" className="planner-secondary-button" onClick={cancelEdit}>Cancel edit</button>}
            <button type="submit" className="planner-primary-button" disabled={saving}>{saving ? "Saving…" : "Save activity"}</button>
          </div>
        </form>

        <section className="planner-trip-list" aria-labelledby="itinerary-heading">
          <h2 id="itinerary-heading">Itinerary</h2>
          {items.length === 0 && <p className="planner-empty">No activities yet. Add the first activity above.</p>}
          <div className="planner-activity-list">
            {items.map((item) => (
              <article className="planner-panel planner-activity-card" key={item.id}>
                <time dateTime={item.date}>{item.date}</time>
                <div>
                  <h3>{item.activity}</h3>
                  {item.notes && <p>{item.notes}</p>}
                </div>
                <div className="planner-trip-actions">
                  <button type="button" className="planner-secondary-button" onClick={() => beginEdit(item)}>Edit</button>
                  <button type="button" className="planner-danger-button" onClick={() => remove(item)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
