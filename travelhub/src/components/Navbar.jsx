import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="wrapper">
      <div className="brand-logo">
        <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="brand-name">TravelHub</span>
      </div>
      
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
      </ul>
      
      <div className="btn-container">
        <Link to="/login" className="btn-1">Sign In</Link>
        <Link to="/register" className="btn-2">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;