import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.offsetHeight + 60; // cover the whole footer
    }
    resize();
    window.addEventListener("resize", resize);

    const layers = [
      { amp: 30, len: 0.006, speed: 0.02, alpha: 0.45, offset: 0 },
      { amp: 22, len: 0.009, speed: 0.03, alpha: 0.30, offset: 2 },
      { amp: 18, len: 0.012, speed: 0.04, alpha: 0.20, offset: 4 },
    ];

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const l of layers) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = 60 + Math.sin(x * l.len + t * l.speed * 10 + l.offset) * l.amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // teal wave that fades out toward the bottom
        const g = ctx.createLinearGradient(0, 30, 0, canvas.height);
        g.addColorStop(0, `rgba(61, 220, 180, ${l.alpha})`);
        g.addColorStop(1, "rgba(61, 220, 180, 0)");
        ctx.fillStyle = g;
        ctx.fill();
      }
      t += 0.1;
      frameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        background: "transparent", // <-- footer background removed
        color: "#fff",
        marginTop: 60,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", left: 0, top: -60, zIndex: 0, pointerEvents: "none" }}
      />

      <div className="wrapper footer-1" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="footer-bottom">
            <div className="brand-logo">
              <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className="brand-name">TravelHub</span>
            </div>
            <p className="footer-text">
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
              <li className="footer-link"><Link to="/destinations" className="footer-link">Destinations</Link></li>
              <li className="footer-link"><Link to="/destinations" className="footer-link">Featured Places</Link></li>
              <li className="footer-link"><Link to="/home" className="footer-link">Plan a Trip</Link></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <h2>ACCOUNT</h2>
            <ul>
              <li className="footer-link"><Link to="/home" className="footer-link">Dashboard</Link></li>
              <li className="footer-link"><Link to="/home" className="footer-link">My Trips</Link></li>
              <li className="footer-link"><Link to="/home" className="footer-link">Profile</Link></li>
            </ul>
          </div>

          <div className="footer-bottom footer-2">
            <h2>TRAVEL INSPIRATION</h2>
            <p>
              Get curated travel tips
              <br />
              delivered to your inbox.
            </p>
            <form className="footer-input">
              <input type="email" placeholder="Name@example.com" required />
              <button type="submit" className="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-rightcopy" style={{ position: "relative", zIndex: 1 }}>
        <p>&copy; 2026 TravelHub. Student Project - Educational Use.</p>
        <p>Built with love using React &amp; Firebase</p>
      </div>
    </footer>
  );
}

export default Footer;