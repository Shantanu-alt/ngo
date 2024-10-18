import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import '../ViewUpcoming.css'; // Import your CSS file
import BackToTop from "../components/BackToTop"; // Assuming you have a BackToTop component
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import PageHeader from "../components/PageHeader"; // Assuming you have a PageHeader component
import Footer from "../components/Footer"; // Assuming you have a Footer component

const ViewUpcoming = () => {
  const [eventsData, setEventsData] = useState([]); // Updated to store multiple events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 8; // Adjust based on how many events you want to display per page

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventsCollection = collection(db, 'upcomingEvents'); // Fetch from 'upcomingEvents' collection
        const eventSnapshot = await getDocs(eventsCollection);
        const eventsList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setEventsData(eventsList); // Store all events
      } catch (err) {
        setError('Error fetching event data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  // Calculate the current events to display based on the current page
  const currentEvents = eventsData.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);
  const totalPages = Math.ceil(eventsData.length / eventsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (eventsData.length === 0) return <p>No event data found.</p>;

  return (
    <>
      <Navbar />

      <div className="event-view-container">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {currentEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <h3>{event.title}</h3>
              <div className="event-details">
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Participation:</strong> {event.participation ? "Yes" : "No"}</p>
                <p><strong>Donation Type:</strong> {event.donationType}</p>
                {event.donationType === 'material' && (
                  <p><strong>Donation Quantity:</strong> {event.donationQuantity}</p>
                )}
                {event.donationType === 'money' && (
                  <p><strong>Donation Amount:</strong> {event.donationAmount || "Not specified"}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </button>
          <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >
            Next
          </button>
        </div>
      </div>

      <BackToTop />
      <Footer />
    </>
  );
};

export default ViewUpcoming;
