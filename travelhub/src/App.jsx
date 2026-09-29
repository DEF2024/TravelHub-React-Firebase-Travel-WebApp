import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet 
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";
import Payment from "./pages/Payment";
import AnimatedBackground from "./components/AnimatedBackground";
import Profile from "./pages/Profile";
import DestinationsGrid from "./components/DestinationsGrid";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="app-content">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/DestinationCard" element={<DestinationsGrid />} />

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;