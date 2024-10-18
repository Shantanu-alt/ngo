import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewEvents from "./pages/ViewEvents";
import VolunteerForm from "./components/VolunteerForm";
import Volunteer from "./pages/Volunteer";
import VolunteerReq from "./pages/VolunteerReq";
import InDonation from "./pages/InDonation";
import ViewInkind from "./pages/ViewInkind";
import UpcomingEvents from "./pages/UpcomingEvents";
import ViewUpcomingEvents from "./pages/ViewUpcomingEvents";


// ProtectedRoute component to handle route access based on user authentication
const ProtectedRoute = ({ element, auth }) => {
  return auth ? element : <Navigate to="/login" />;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsAuthenticated(!!isLoggedIn); // Convert to boolean
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viewevents" element={<ViewEvents />} />
        <Route path="/volunteerform" element={<VolunteerForm />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteerreq" element={<VolunteerReq />} />
        <Route path="/inkinddonate" element={<InDonation  />} />
        <Route path="/viewinkinddonate" element={<ViewInkind  />} />
        <Route path="/upcomingevent" element={<UpcomingEvents  />} />
        <Route path="/viewupcomingevents" element={<ViewUpcomingEvents  />} />
        

        {/* Login and Register are public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

