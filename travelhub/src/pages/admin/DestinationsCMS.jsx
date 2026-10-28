import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  deleteDestination,
  listCategories,
  listDestinations,
  renameCategory,
  saveCategory,
  saveDestination,
} from "../../services/destinationService";

const accessibilityOptions = [
  ["wheelchair", "Wheelchair access"],
  ["accessibleToilets", "Accessible toilets"],
  ["visualSignage", "Visual signage"],
  ["communicationSupport", "Communication support"],
  ["parking", "Parking available"],
];
const emptyForm = {
  name: "",
  region: "",
  categories: [],
  bestSeason: "",
  description: "",
  imageUrl: "",
  accessibility: [],
  featured: false,
  published: false,
};

export default function DestinationsCMS() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setError("");
    try {
      const [destinationResults, categoryResults] = await Promise.all([
        listDestinations({ includeUnpublished: true }),
        listCategories(),
      ]);
      setItems(destinationResults);
      setCategories(categoryResults);
    } catch (loadError) {
      console.error("Unable to load CMS data.", loadError);
      setError("Unable to load destinations and categories. Check your admin account and Firestore rules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return items.filter((destination) => (
      `${destination.name} ${destination.region} ${(destination.categories ?? []).join(" ")}`
        .toLocaleLowerCase()
        .includes(normalizedQuery)
    ));
  }, [items, query]);

  const openNew = () => {
    setForm({ ...emptyForm, categories: categories[0] ? [categories[0].name] : [] });
    setEditing("new");
    setError("");
  };

  const openEdit = (destination) => {
    setForm({
      ...emptyForm,
      ...destination,
      categories: destination.categories ?? [],
      accessibility: destination.accessibility ?? [],
    });
    setEditing(destination.id);
    setError("");
  };

  const close = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const changeForm = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const toggleArrayField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const submitDestination = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.region.trim() || form.categories.length === 0) {
      setError("Name, region, and at least one category are required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await saveDestination(form, editing === "new" ? null : editing);
      close();
      await refresh();
    } catch (saveError) {
      console.error("Unable to save destination.", saveError);
      setError("Unable to save destination. Check your admin permissions and try again.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (destination) => {
    try {
      await saveDestination({ ...destination, published: !destination.published }, destination.id);
      await refresh();
    } catch (updateError) {
      console.error("Unable to update destination publication.", updateError);
      setError("Unable to update the destination. Please try again.");
    }
  };

  const removeDestination = async (destination) => {
    if (!window.confirm(`Delete "${destination.name}"?`)) return;
    try {
      await deleteDestination(destination.id);
      await refresh();
    } catch (deleteError) {
      console.error("Unable to delete destination.", deleteError);
      setError("Unable to delete the destination. Please try again.");
    }
  };

  const addCategory = async (event) => {
    event.preventDefault();
    if (!categoryName.trim()) return;
    if (categories.some((category) => category.name.toLocaleLowerCase() === categoryName.trim().toLocaleLowerCase())) {
      setError("That category already exists.");
      return;
    }
    try {
      setError("");
      await saveCategory(categoryName);
      setCategoryName("");
      await refresh();
    } catch (categoryError) {
      console.error("Unable to add category.", categoryError);
      setError("Unable to add category. Check your admin permissions and try again.");
    }
  };

  const removeCategory = async (category) => {
    if (items.some((destination) => destination.categories?.includes(category.name))) {
      setError(`"${category.name}" is assigned to destinations. Remove it from those destinations first.`);
      return;
    }
    if (!window.confirm(`Delete the "${category.name}" category?`)) return;
    try {
      await deleteCategory(category.id);
      await refresh();
    } catch (categoryError) {
      console.error("Unable to delete category.", categoryError);
      setError("Unable to delete category. Please try again.");
    }
  };

  const editCategory = async (category) => {
    const renamed = window.prompt("Rename category", category.name)?.trim();
    if (!renamed || renamed === category.name) return;
    if (categories.some((item) => item.id !== category.id && item.name.toLocaleLowerCase() === renamed.toLocaleLowerCase())) {
      setError("A category with that name already exists.");
      return;
    }
    try {
      await renameCategory(category.id, category.name, renamed);
      await refresh();
    } catch (renameError) {
      console.error("Unable to rename category.", renameError);
      setError(renameError.message || "Unable to rename category. Please try again.");
    }
  };

  return (
    <main className="cms-page">
      <div className="cms-container">
        <Link className="planner-back-link" to="/admin">← Admin dashboard</Link>
        <header className="cms-header">
          <div>
            <h1>Destinations</h1>
            <p className="cms-count">{items.filter((destination) => destination.published).length} published, {items.length} total</p>
          </div>
          <button type="button" onClick={openNew} className="cms-primary-button">+ Add destination</button>
        </header>

        {error && !editing && <p className="cms-error" role="alert">{error}</p>}
        <section className="cms-category-manager" aria-labelledby="categories-heading">
          <div>
            <h2 id="categories-heading">Categories</h2>
            <p>Create reusable categories for destination filters.</p>
          </div>
          <form onSubmit={addCategory} className="cms-category-add">
            <label className="visually-hidden" htmlFor="new-category">New category name</label>
            <input id="new-category" className="cms-input" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Category name" maxLength={40} required />
            <button type="submit" className="cms-secondary-button">Add category</button>
          </form>
          <ul className="cms-category-list">
            {categories.map((category) => (
              <li key={category.id}>
                <span>{category.name}</span>
                <button type="button" onClick={() => editCategory(category)} aria-label={`Rename ${category.name} category`}>Edit</button>
                <button type="button" onClick={() => removeCategory(category)} aria-label={`Delete ${category.name} category`}>×</button>
              </li>
            ))}
            {categories.length === 0 && <li className="cms-category-empty">No categories yet. Add one to categorize destinations.</li>}
          </ul>
        </section>

        <div className="cms-search">
          <label className="cms-label" htmlFor="destination-search">Search destinations</label>
          <input id="destination-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, region or category" className="cms-input" />
        </div>

        {loading && <p role="status">Loading destinations…</p>}
        {!loading && (
          <div className="cms-grid">
            {visible.map((destination) => (
              <article key={destination.id} className="cms-card">
                <div className="cms-card-header">
                  <div>
                    <h2>{destination.name}</h2>
                    <p className="cms-card-meta">{destination.region} · {(destination.categories ?? []).join(", ")}</p>
                  </div>
                  <span className={`cms-status${destination.published ? " is-published" : ""}`}>{destination.published ? "Published" : "Draft"}</span>
                </div>
                <p className="cms-description">{destination.description}</p>
                {destination.bestSeason && <p className="cms-season">Best time: {destination.bestSeason}</p>}
                {destination.featured && <p className="cms-season">Featured destination</p>}
                <div className="cms-accessibility-preview">
                  {(destination.accessibility ?? []).map((featureId) => (
                    <span key={featureId}>{accessibilityOptions.find(([id]) => id === featureId)?.[1] ?? featureId}</span>
                  ))}
                </div>
                <div className="cms-actions">
                  <button type="button" onClick={() => openEdit(destination)} className="cms-ghost-button">Edit</button>
                  <button type="button" onClick={() => togglePublish(destination)} className="cms-ghost-button">{destination.published ? "Unpublish" : "Publish"}</button>
                  <button type="button" onClick={() => removeDestination(destination)} className="cms-ghost-button cms-delete-button">Delete</button>
                </div>
              </article>
            ))}
            {!visible.length && <p className="cms-empty">{items.length ? "No destinations match your search." : "No destinations yet. Add your first destination."}</p>}
          </div>
        )}

        {editing !== null && (
          <div className="cms-modal-backdrop" role="dialog" aria-modal="true" aria-label={editing === "new" ? "Add destination" : "Edit destination"}>
            <form className="cms-modal" onSubmit={submitDestination}>
              <div className="cms-modal-header">
                <h2>{editing === "new" ? "Add destination" : "Edit destination"}</h2>
                <button type="button" onClick={close} aria-label="Close" className="cms-ghost-button">×</button>
              </div>
              <div className="cms-form">
                <label className="cms-field">
                  <span className="cms-label">Name</span>
                  <input name="name" value={form.name} onChange={changeForm} className="cms-input" maxLength={100} required />
                </label>
                <label className="cms-field">
                  <span className="cms-label">State or region</span>
                  <input name="region" value={form.region} onChange={changeForm} className="cms-input" maxLength={100} required />
                </label>
                <fieldset className="cms-check-group">
                  <legend className="cms-label">Categories</legend>
                  {categories.map((category) => (
                    <label className="cms-checkbox" key={category.id}>
                      <input type="checkbox" checked={form.categories.includes(category.name)} onChange={() => toggleArrayField("categories", category.name)} />
                      {category.name}
                    </label>
                  ))}
                  {!categories.length && <p>Add a category before creating a destination.</p>}
                </fieldset>
                <label className="cms-field">
                  <span className="cms-label">Best time to visit</span>
                  <input name="bestSeason" value={form.bestSeason} onChange={changeForm} className="cms-input" maxLength={100} />
                </label>
                <label className="cms-field">
                  <span className="cms-label">Image URL</span>
                  <input type="url" name="imageUrl" value={form.imageUrl} onChange={changeForm} className="cms-input" placeholder="https://…" />
                </label>
                <label className="cms-field">
                  <span className="cms-label">Description</span>
                  <textarea name="description" rows={3} value={form.description} onChange={changeForm} className="cms-input" maxLength={1000} />
                </label>
                <fieldset className="cms-check-group">
                  <legend className="cms-label">Accessibility information</legend>
                  {accessibilityOptions.map(([id, label]) => (
                    <label className="cms-checkbox" key={id}>
                      <input type="checkbox" checked={form.accessibility.includes(id)} onChange={() => toggleArrayField("accessibility", id)} />
                      {label}
                    </label>
                  ))}
                </fieldset>
                <label className="cms-checkbox"><input type="checkbox" name="featured" checked={form.featured} onChange={changeForm} /> Featured destination</label>
                <label className="cms-checkbox"><input type="checkbox" name="published" checked={form.published} onChange={changeForm} /> Publish on the site</label>
                {error && <p className="cms-error" role="alert">{error}</p>}
              </div>
              <div className="cms-modal-actions">
                <button type="button" onClick={close} className="cms-ghost-button">Cancel</button>
                <button type="submit" className="cms-primary-button" disabled={saving || categories.length === 0}>{saving ? "Saving…" : "Save destination"}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
