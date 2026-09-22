import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="wrapper footer-1">
        <div className="row">
          <div className="footer-bottom">
            <div className="world">TravelHub</div>
            <p>
              Discover incredible
              <br />
              destinations, plan dream
              <br />
              trips, and create
              <br />
              unforgettable memories.
            </p>
          </div>

          <div className="footer-bottom">
            <h2>EXPLORE</h2>
            <ul>
              <li className="footer-link"><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/destinations">Featured Places</Link></li>
              <li><Link to="/home">Plan a Trip</Link></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <h2>ACCOUNT</h2>
            <ul>
              <li><Link to="/home">Dashboard</Link></li>
              <li><Link to="/home">My Trips</Link></li>
              <li><Link to="/home">Profile</Link></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <h2>TRAVEL INSPIRATION</h2>
            <p>
              Get curated travel tips
              <br />
              delivered to your inbox.
            </p>

            <form className="footer-input">
              <input type="email" placeholder="Name@example.com" required />
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;