import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore imports
import "../viewevents.css"; // Custom CSS for styling
import BackToTop from "../components/BackToTop";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0); // For image rotation
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 8;

  const fetchEvents = async () => {
    const db = getFirestore();
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
  
    const eventList = eventSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Provide a default date if createdAt is missing
      };
    });
  
    // Sort events by createdAt in descending order
    eventList.sort((a, b) => b.createdAt - a.createdAt);
    setEvents(eventList);
  };
  

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  const handleImageClick = (event) => {
    setSelectedImage(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRotation(0); // Reset rotation
  };

  const rotateImage = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  // Calculate the current events to display based on the current page
  const currentEvents = events.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <>
      <PageHeader title="Event Gallery" path="/ViewEvents" name="Pages/ Events" />
      <Navbar />

      {/* Container to align grid with padding */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          {currentEvents.map((event, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <div className="card event-card" onClick={() => handleImageClick(event)}>
                <img src={event.imageUrl} className="card-img-top" alt={event.title} />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.details}</p>
                  {/* Display the date and time in one line */}
                  <p className="event-date-time">
                    {`Date: ${event.createdAt.toLocaleDateString()} Time: ${event.time}`}
                  </p>
                </div>
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

      {/* Modal for Image Enlargement */}
      {showModal && selectedImage && (
        <div className="modal show" style={{ display: "block" }} onClick={handleModalClose}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedImage.title}</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    cursor: "pointer",
                  }}
                  className="img-fluid"
                  onClick={rotateImage}
                />
                <p>{selectedImage.details}</p>
                {/* Display the date and time in one line in the modal */}
                <p className="modal-date-time">
                  {`Date: ${selectedImage.createdAt.toLocaleDateString()} Time: ${selectedImage.time}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BackToTop />
      <Footer />
    </>
  );
};

export default ViewEvents;
