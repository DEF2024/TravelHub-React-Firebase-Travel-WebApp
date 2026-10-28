import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listUsers } from "../../services/authService";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listUsers().then((results) => {
      if (active) setUsers(results);
    }).catch((loadError) => {
      console.error("Unable to load users.", loadError);
      if (active) setError("Unable to load users. Check your admin account and Firestore rules.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <main className="planner-page">
      <section className="planner-container">
        <Link className="planner-back-link" to="/admin">← Admin dashboard</Link>
        <h1 className="admin-page-title">Users</h1>
        <p className="admin-page-intro">Registered TravelHub profiles.</p>
        {error && <p className="planner-error" role="alert">{error}</p>}
        {loading && <p role="status">Loading users…</p>}
        {!loading && !error && users.length === 0 && <p className="planner-empty">No user profiles found.</p>}
        {!loading && users.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>User ID</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name || "—"}</td>
                    <td>{user.email || "—"}</td>
                    <td>{user.role || "user"}</td>
                    <td><code>{user.id}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
