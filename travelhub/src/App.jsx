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
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DestinationCMS from "./pages/admin/DestinationsCMS";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTripsUsers from "./pages/admin/TripsUsers";
import AdminUsers from "./pages/admin/Users";
import AdminTripDetails from "./pages/admin/TripDetails";
import Itinerary from "./pages/Itinerary";
import ProtectedRoute from "./components/ProtectedRoute";
import PortalLayout from "./components/PortalLayout";
import { AuthProvider } from "./hooks/useAuth";

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
    <div className="app-content">
      <AuthProvider>
       <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/DestinationCard" element={<Navigate to="/destinations" replace />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:tripId" element={<Itinerary />} />
          </Route>
          <Route element={<ProtectedRoute adminOnly><PortalLayout admin /></ProtectedRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/destinations" element={<DestinationCMS />} />
            <Route path="/admin/trips" element={<AdminTripsUsers />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/trips/:tripId" element={<AdminTripDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
       </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;