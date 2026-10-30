import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyImage7 from "../assets/treeicon.png";
import MyImage8 from "../assets/beachicon.png";
import MyImage9 from "../assets/heritageicon.png";
import MyImage10 from "../assets/adventureicon.png";
import MyImage11 from "../assets/city-icon.png";
import MyImage12 from "../assets/hill-icon.png";
import YosemiteImage from "../assets/Islands.jpg";
import KyotoImage from "../assets/Kalka.jpg";
import ReefImage from "../assets/istockphoto.jpg";
import BarcelonaImage from "../assets/Sonmarg.jpg";
import * as THREE from "three";

function Home() {
  const navigate = useNavigate();
  const [destinationSearch, setDestinationSearch] = useState("");
  useEffect(() => initializeGlobe(), []);

  const searchDestinations = (event) => {
    event.preventDefault();
    const query = destinationSearch.trim();
    navigate(query ? `/destinations?q=${encodeURIComponent(query)}` : "/destinations");
  };

  return (
    <main className="wrapper">
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">ONE PLANET · ENDLESS DISCOVERIES</p>
        <h1>Destination<br /><span>at a Time</span></h1>
        <p className="intro">Discover breathtaking destinations, plan memorable trips, and create your perfect travel itinerary—all in one place.</p>
        <form className="home-destination-search" onSubmit={searchDestinations}>
          <label className="visually-hidden" htmlFor="homeDestinationSearch">Search destinations</label>
          <input
            id="homeDestinationSearch"
            type="search"
            value={destinationSearch}
            onChange={(event) => setDestinationSearch(event.target.value)}
            placeholder="Search destinations"
          />
        </form>
        <div className="home-hero-actions">
          <Link className="primary-button" to="/destinations">Explore Destinations</Link>
          <Link className="hero-secondary-button" to="/payment">Start Planning free</Link>
        </div>
      </div>

      <div className="globe-stage" id="globeSection">
        <div className="stage-glow"></div>
        <div id="globeCanvas" aria-label="Interactive 3D Earth globe. Drag to rotate."></div>
        <div className="stage-label"><span className="live-dot"></span><span id="statusText">Earth is rotating continuously</span></div>
        <div className="stage-help">Drag to rotate · Scroll to zoom</div>
      </div>

      <aside className="side-cards">
        <article className="visual-card forest-card">
          <div className="card-content"><span className="emoji">🌳</span><h2>Explore Forests</h2><p>Discover forests, national parks and natural wonders.</p><a href="#essay">Explore nature →</a></div>
        </article>
        <article className="visual-card walk-card">
          <div className="card-content"><span className="emoji">🚶</span><h2>Walk Around the World</h2><p>Turn a huge dream into small daily walking goals.</p><a href="#journey">Track your walk →</a></div>
        </article>
      </aside>
    </section>

    <section className="home-1">
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" height="54px" viewBox="0 -960 960 960" width="54px" fill="#000000"><path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"/></svg>
            <h1>500+</h1>
            <p>Destinations</p> 
        </div>
        <div className="home-1-content">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM250-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42Zm426 0q-42 42-108 42-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108q0 66-42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm324.5-346.5Q448-592 448-631t-25.5-64.5Q397-721 358-721t-64.5 25.5Q268-670 268-631t25.5 64.5Q319-541 358-541t64.5-25.5ZM358-220Zm0-411Z"/></svg>
            <h1>10K+</h1>
            <p>Happy Travelers</p>
        </div>
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m612-120-263-93-179 71q-17 9-33.5-1T120-173v-558q0-13 7.5-23t19.5-15l202-71 263 92 178-71q17-8 33.5 1.5T840-788v565q0 11-7.5 19T814-192l-202 72Zm-34-75v-505l-196-66v505l196 66Zm60 0 142-47v-512l-142 54v505Zm-458-12 142-54v-505l-142 47v512Zm458-493v505-505Zm-316-66v505-505Z"/></svg>           
            <h1>28+</h1>
            <p>States Covered</p>
        </div>
        <div className="home-1-content">
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="48" viewBox="0 0 24 24" width="48"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M18,11.09c0,4-2.55,7.7-6,8.83c-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12l6,2.12V11.09z M8.82,10.59L7.4,12l3.54,3.54l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,10.59z"/></g></svg>
            <h1>100%</h1>
            <p>Safe & Verified</p>
        </div>
    </section>

    <section className="featured-accessible-section" aria-labelledby="featured-accessible-heading">
      <div className="featured-accessible-heading">
        <h2 id="featured-accessible-heading">Featured Accessible Destinations</h2>
        <Link to="/destinations">Browse All (14) Destinations <span aria-hidden="true">→</span></Link>
      </div>
      <div className="featured-accessible-grid">
        {[
          { name: "Yosemite Valley & Vernal Falls", location: "Yosemite Village, California, USA", image: YosemiteImage, category: "Nature", description: "Iconic granite cliffs, roaring glacial waterfalls and peaceful valley trails.", rating: "4.9 (582)" },
          { name: "Kyomizu-dera & Ancient Heritage", location: "Kyoto, Kyoto, Japan", image: KyotoImage, category: "Heritage", description: "A breathtaking UNESCO World Heritage Buddhist temple perched on Mount.", rating: "4.8 (612)" },
          { name: "Great Barrier Reef Marine Life", location: "Cairns, Queensland, Australia", image: ReefImage, category: "Eco", description: "The world's largest coral reef ecosystem, Experience world-class citizen marine...", rating: "4.9 (290)" },
          { name: "Barceloneta Beach", location: "Barcelona, Spain", image: BarcelonaImage, category: "Beaches", description: "Sun-drenched Mediterranean vibes meet centuries of Roman and Catalan culture.", rating: "4.8 (620)" },
        ].map((destination) => (
          <article className="featured-accessible-card" key={destination.name}>
            <div className="featured-accessible-image">
              <img src={destination.image} alt="" />
              <span className="featured-accessible-badge">✦ Featured</span>
              <span className={`featured-accessible-category featured-${destination.category.toLowerCase()}`}>{destination.category === "Eco" ? "♧ Eco" : destination.category}</span>
              <button type="button" className="featured-accessible-favourite" aria-label={`Save ${destination.name}`}>♡</button>
            </div>
            <div className="featured-accessible-body">
              <p className="featured-accessible-location">⌖ <span>{destination.location}</span></p>
              <p className="featured-accessible-rating">★ <span>{destination.rating}</span></p>
              <h3>{destination.name}</h3>
              <p className="featured-accessible-description">{destination.description}</p>
              <div className="featured-accessible-label">Accessibility Highlights</div>
              <div className="featured-accessibility-symbols" aria-label="Accessibility supports">
                <span title="Assistance / mobility support" aria-label="Assistance and mobility support">🚶</span>
                <span title="Wheelchair accessibility" aria-label="Wheelchair accessibility">♿</span>
                <span title="Accessible parking" aria-label="Accessible parking">🅿️</span>
                <span title="Hearing accessibility" aria-label="Hearing accessibility">🦻</span>
              </div>
              <div className="featured-accessible-actions">
                <Link to="/destinations">Explore Guide →</Link>
                <Link to="/trips">＋ Add to Trip</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="home-3">
        <div className="title-container">
            <h1>Explore by Category</h1>
            <div className="underline"></div>
            <p>Find your perfect type of getaway</p>
        </div>
        <div className="card-1">
            <Link className="card-options card" to="/destinations?category=Nature" aria-label="Explore Nature destinations">
                <img src={MyImage7} alt="" />
                <h4>Nature</h4>
                <p>Forests, wildlife & greenery</p>
            </Link>
            <Link className="card-options card" to="/destinations?category=Beach" aria-label="Explore Beach destinations">
                <img src={MyImage8} alt="" />
                <h4> Beach</h4>
                <p>Coastal gems & sunsets</p>
            </Link>
            <Link className="card-options card" to="/destinations?category=Heritage" aria-label="Explore Heritage destinations">
                <img src={MyImage9} alt="" />
                <h4>Heritage</h4>
                <p>History & architecture</p>
            </Link>
            <Link className="card-options card" to="/destinations?category=Adventure" aria-label="Explore Adventure destinations">
                <img src={MyImage10} alt="" />
                <h4>Adventure</h4>
                <p>Thrills & exploration</p>
            </Link>
            <Link className="card-options card" to="/destinations?category=City" aria-label="Explore City destinations">
                <img src={MyImage11} alt="" />
                <h4>City</h4>
                <p>Urban life & culture</p>
            </Link>
            <Link className="card-options card" to="/destinations?category=Hill" aria-label="Explore Hill destinations">
                <img src={MyImage12} alt="" />
                <h4>Hill</h4>
                <p>Scenic hill stations</p>
            </Link>
        </div>
        
    </section>
   
    <section className="home-4">
        <div className="box-1">
            <h1>Ready to Start Your Adventure?</h1>
            <p>Join thousands of travelers who plan unforgettable trips with TravelHub</p>
            <div>
                <Link to="/Login" className="btu-4">Create Free Account</Link>
                <Link to="/destinations" className="btu-4">Browse Destinations</Link>
            </div>
        </div>

    </section>

    </main>


    


    
  );
}

export default Home;

function initializeGlobe() {
const container = document.getElementById("globeCanvas");
const statusText = document.getElementById("statusText");
if (!container || !statusText) return;

const listeners = new AbortController();
let disposed = false;
let animationFrame;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 0, 5.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.domElement.setAttribute("aria-label", "Interactive 3D globe");
container.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x9dcfff, 2.0));
const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
keyLight.position.set(-3, 2, 5);
scene.add(keyLight);
const rimLight = new THREE.PointLight(0x168bff, 16, 12);
rimLight.position.set(3, -1, -3);
scene.add(rimLight);

const earthGroup = new THREE.Group();
scene.add(earthGroup);
const sphereGeometry = new THREE.SphereGeometry(1.5, 96, 96);

// Textures load from the internet. If the texture is unavailable, a blue globe remains visible.
const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");
const earthMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a75b9,
  roughness: 0.92,
  metalness: 0.02
});
const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
earthGroup.add(earth);

textureLoader.load(
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
  texture => {
    if (disposed) {
      texture.dispose();
      return;
    }
    texture.colorSpace = THREE.SRGBColorSpace;
    earthMaterial.map = texture;
    earthMaterial.color.set(0xffffff);
    earthMaterial.needsUpdate = true;
  },
  undefined,
  () => console.info("Earth texture did not load; showing the blue fallback globe.")
);

// Soft outer atmosphere.
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.57, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0x219dff, transparent: true, opacity: 0.11, side: THREE.BackSide })
);
earthGroup.add(atmosphere);

// Subtle latitude and longitude lines.
const gridMaterial = new THREE.LineBasicMaterial({ color: 0x7adfff, transparent: true, opacity: 0.19 });
const gridGroup = new THREE.Group();
earthGroup.add(gridGroup);
for (let lat = -60; lat <= 60; lat += 20) {
  const points = [];
  const phi = (90 - lat) * Math.PI / 180;
  for (let lon = 0; lon <= 360; lon += 3) {
    const theta = lon * Math.PI / 180;
    points.push(new THREE.Vector3(
      1.507 * Math.sin(phi) * Math.cos(theta),
      1.507 * Math.cos(phi),
      1.507 * Math.sin(phi) * Math.sin(theta)
    ));
  }
  gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
}
for (let lon = 0; lon < 180; lon += 20) {
  const points = [];
  const theta = lon * Math.PI / 180;
  for (let lat = -90; lat <= 90; lat += 3) {
    const phi = (90 - lat) * Math.PI / 180;
    points.push(new THREE.Vector3(
      1.507 * Math.sin(phi) * Math.cos(theta),
      1.507 * Math.cos(phi),
      1.507 * Math.sin(phi) * Math.sin(theta)
    ));
  }
  gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), gridMaterial));
}

// Convert longitude and latitude to a point on the sphere.
function latLonToVector3(lat, lon, radius = 1.54) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const places = {
  India: { lat: 20.5937, lon: 78.9629, color: 0x43f4ca },
  China: { lat: 35.8617, lon: 104.1954, color: 0xffd66b },
  Japan: { lat: 36.2048, lon: 138.2529, color: 0xff8aab },
  Australia: { lat: -25.2744, lon: 133.7751, color: 0x9b8bff },
  Brazil: { lat: -14.235, lon: -51.9253, color: 0x7dff8d },
  Canada: { lat: 56.1304, lon: -106.3468, color: 0x7ddcff },
  France: { lat: 46.2276, lon: 2.2137, color: 0xffc56e }
};

const markerGroup = new THREE.Group();
earthGroup.add(markerGroup);
const markerMeshes = {};
for (const [name, place] of Object.entries(places)) {
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 18, 18),
    new THREE.MeshBasicMaterial({ color: place.color })
  );
  marker.position.copy(latLonToVector3(place.lat, place.lon, 1.55));
  marker.userData.country = name;
  markerGroup.add(marker);
  markerMeshes[name] = marker;

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.078, 18, 18),
    new THREE.MeshBasicMaterial({ color: place.color, transparent: true, opacity: 0.25 })
  );
  glow.position.copy(marker.position);
  markerGroup.add(glow);
}

// Curved travel routes between the destinations.
const routeMaterial = new THREE.LineDashedMaterial({
  color: 0x69e7ff, dashSize: 0.055, gapSize: 0.035, transparent: true, opacity: 0.88
});
const routePairs = [["India", "China"], ["China", "Japan"], ["Japan", "Australia"], ["India", "France"], ["France", "Brazil"]];
const routeGroup = new THREE.Group();
earthGroup.add(routeGroup);
for (const [from, to] of routePairs) {
  const start = latLonToVector3(places[from].lat, places[from].lon, 1.57);
  const end = latLonToVector3(places[to].lat, places[to].lon, 1.57);
  const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.95);
  const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(80));
  const line = new THREE.Line(geometry, routeMaterial.clone());
  line.computeLineDistances();
  routeGroup.add(line);
}

// Small plane marker travels continuously along a route.
const plane = new THREE.Group();
const planeBody = new THREE.Mesh(
  new THREE.ConeGeometry(0.045, 0.15, 8),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
planeBody.rotation.x = Math.PI / 2;
plane.add(planeBody);
earthGroup.add(plane);
const planeStart = latLonToVector3(places.India.lat, places.India.lon, 1.68);
const planeEnd = latLonToVector3(places.China.lat, places.China.lon, 1.68);
const planeMiddle = planeStart.clone().add(planeEnd).multiplyScalar(0.5).normalize().multiplyScalar(2.02);
const planeCurve = new THREE.QuadraticBezierCurve3(planeStart, planeMiddle, planeEnd);

let autoRotate = true;
let dragging = false;
let previousX = 0;
let previousY = 0;
let targetRotationY = 0;
let targetRotationX = 0.12;

function resize() {
  const width = Math.max(container.clientWidth, 280);
  const height = Math.max(container.clientHeight, 300);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(container);
resize();

container.addEventListener("pointerdown", event => {
  dragging = true;
  previousX = event.clientX;
  previousY = event.clientY;
  container.setPointerCapture?.(event.pointerId);
}, { signal: listeners.signal });
container.addEventListener("pointermove", event => {
  if (!dragging) return;
  const dx = event.clientX - previousX;
  const dy = event.clientY - previousY;
  targetRotationY += dx * 0.006;
  targetRotationX += dy * 0.004;
  targetRotationX = Math.max(-0.9, Math.min(0.9, targetRotationX));
  previousX = event.clientX;
  previousY = event.clientY;
}, { signal: listeners.signal });
container.addEventListener("pointerup", () => { dragging = false; }, { signal: listeners.signal });
container.addEventListener("pointercancel", () => { dragging = false; }, { signal: listeners.signal });
container.addEventListener("wheel", event => {
  event.preventDefault();
  camera.position.z = Math.max(3.6, Math.min(7, camera.position.z + event.deltaY * 0.003));
}, { passive: false, signal: listeners.signal });

function selectCountry(name) {
  const place = places[name];
  if (!place) return;
  targetRotationY = -place.lon * Math.PI / 180;
  statusText.textContent = `${name} selected · Earth is rotating continuously`;
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
container.addEventListener("click", event => {
  if (dragging) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(Object.values(markerMeshes), false);
  if (hits.length) selectCountry(hits[0].object.userData.country);
}, { signal: listeners.signal });

const clock = new THREE.Timer();
clock.connect(document);
function animate() {
  animationFrame = requestAnimationFrame(animate);
  clock.update();
  const elapsed = clock.getElapsed();

  if (autoRotate && !dragging) targetRotationY += 0.0018;
  earthGroup.rotation.y += (targetRotationY - earthGroup.rotation.y) * 0.035;
  earthGroup.rotation.x += (targetRotationX - earthGroup.rotation.x) * 0.035;

  // Pulse the destination markers.
  for (const marker of Object.values(markerMeshes)) {
    const pulse = 1 + Math.sin(elapsed * 3 + marker.position.x * 4) * 0.15;
    marker.scale.setScalar(pulse);
  }

  // Move the airplane from India to China and loop forever.
  const t = (elapsed * 0.075) % 1;
  const point = planeCurve.getPoint(t);
  plane.position.copy(point);
  const tangent = planeCurve.getTangent(t).normalize();
  plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);

  renderer.render(scene, camera);
}
animate();

return () => {
  disposed = true;
  cancelAnimationFrame(animationFrame);
  listeners.abort();
  resizeObserver.disconnect();
  clock.disconnect();
  scene.traverse(object => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(material => {
        material.map?.dispose();
        material.dispose();
      });
    }
  });
  renderer.dispose();
  renderer.domElement.remove();
};
}