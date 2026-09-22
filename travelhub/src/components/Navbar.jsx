 import Login from "../pages/Login"; 

  function Navbar() {
    return (
      <nav class="wrapper ">
                <div className="brand-logo">
          <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="brand-name">TravelHub</span>
        </div>
        <ul>
          <li><a href="Home">Home</a></li>
          <li><a href="Destinations">Destinations</a></li>
        </ul>
        <div class="btn-container">
          <a href="Login" class="btn-1" >Sign In</a>
          <button class="btn-2">Get Started</button>
        </div>
      </nav>
    );
  }

  export default Navbar;