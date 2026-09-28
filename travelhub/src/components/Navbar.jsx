import { Link } from "react-router-dom";
import { useState } from "react";
import "../App.css";


function Navbar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
    <nav className={`wrapper app-nav${menuIsOpen ? " app-nav-active" : ""}`}>
      <div className="brand-logo">
        <svg className="globe-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <button type="button" className="close-nav" aria-label="Close navigation menu" onClick={() => setMenuIsOpen(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
      </button>
    </nav>

    <nav className="wrapper web-nav">
      <div className="brand-logo">
        <svg className="globe-icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <button type="button" className="mean-nav" aria-label="Open navigation menu" onClick={() => setMenuIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
      </button>
    </nav>
    </>
  );
}

export default Navbar;