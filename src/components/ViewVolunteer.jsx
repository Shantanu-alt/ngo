import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure Firebase is configured
import '../ViewVolunteer.css'; // CSS for styling

const ViewVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // To track the clicked volunteer

  // Fetch all volunteer submissions from Firestore on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'volunteers')); // 'volunteers' is the collection name
        const volunteerList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVolunteers(volunteerList);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      }
    };

    fetchVolunteers();
  }, []);

  // Handle the search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered volunteers based on the search term
  const filteredVolunteers = volunteers.filter(volunteer => {
    const searchString = searchTerm.toLowerCase();
    return volunteer.name.toLowerCase().includes(searchString) || volunteer.email.toLowerCase().includes(searchString);
  });

  // Show volunteer details when clicked
  const handleVolunteerClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  // Return to the volunteer list view
  const handleBackToList = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="view-volunteer-container">
      <h1>Volunteer Requests</h1>

      {/* Search Box */}
      {!selectedVolunteer && (
        <>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-box"
          />
        
          {/* Display Volunteer Submissions */}
          <div className="volunteer-list">
            {filteredVolunteers.map(volunteer => (
              <div
                key={volunteer.id}
                className="volunteer-card"
                onClick={() => handleVolunteerClick(volunteer)}
              >
                <h2>{volunteer.name}</h2>
                <p><strong>Email:</strong> {volunteer.email}</p>
                <p><strong>Phone:</strong> {volunteer.mobile}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Volunteer Details */}
      {selectedVolunteer && (
        <div className="volunteer-details">
          <button onClick={handleBackToList} className="back-button">Back to List</button>
          <h2>{selectedVolunteer.name}'s Volunteer Request</h2>
          <p><strong>Email:</strong> {selectedVolunteer.email}</p>
          <p><strong>Mobile:</strong> {selectedVolunteer.mobile}</p>
          <p><strong>Age:</strong> {selectedVolunteer.age}</p>
          <p><strong>Preferred Role:</strong> {selectedVolunteer.preferredRole}</p>
          <p><strong>Areas of Interest:</strong> {selectedVolunteer.areasOfInterest}</p>
          <p><strong>Goals:</strong> {selectedVolunteer.goals}</p>
          <p><strong>Inspiration:</strong> {selectedVolunteer.inspiration}</p>
          <p><strong>Motivation:</strong> {selectedVolunteer.motivation}</p>
          <p><strong>Previous Experience:</strong> {selectedVolunteer.previousExperience}</p>
          <p><strong>Volunteering:</strong> {selectedVolunteer.volunteering}</p>
          <p><strong>Submitted At:</strong> {selectedVolunteer.createdAt.toDate().toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ViewVolunteer;
