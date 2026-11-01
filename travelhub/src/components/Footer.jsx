import { Link } from "react-router-dom";
import travelHubLogo from "../assets/travelhub-logo.svg";

const exploreLinks = [
  { to: "/home", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/trips", label: "My Trips" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="travel-footer">
      <div className="travel-footer-grid">
        <div className="travel-footer-brand">
          <div className="travel-footer-brand-row">
            <Link to="/home" aria-label="TravelHub home" className="travel-footer-logo-link">
              <img src={travelHubLogo} alt="TravelHub" />
            </Link>
            <span className="travel-footer-divider" aria-hidden="true" />
            <p>
              Discover destinations, plan trips, build day-by-day itineraries
              and keep every journey in one place.
            </p>
          </div>
          <small>&copy; {year} TravelHub. All rights reserved.</small>
        </div>

        <div className="travel-footer-links">
          <nav aria-label="Footer">
            <h2>Explore <span>TravelHub</span></h2>
            <ul>
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}