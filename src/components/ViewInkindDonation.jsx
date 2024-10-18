import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure correct Firebase configuration
import '../ViewInkindDonation.css'; // Custom CSS for styling

const ViewInkindDonation = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch donation data from Firestore on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'inkindDonations')); // Collection name
        const donationList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDonations(donationList);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchDonations();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter donations based on the search term
  const filteredDonations = donations.filter((donation) => {
    const searchString = searchTerm.toLowerCase();
    return (
      donation.name.toLowerCase().includes(searchString) ||
      donation.city.toLowerCase().includes(searchString)
    );
  });

  // Handle click to view donation details
  const handleDonationClick = (donation) => {
    setSelectedDonation(donation);
  };

  // Return to the list view
  const handleBackToList = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="view-donation-container">
      <h1>In-Kind Donations</h1>

      {/* Search Box */}
      {!selectedDonation && (
        <>
          <input
            type="text"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-box"
          />

          {/* List of Donations */}
          <div className="donation-list">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="donation-card"
                onClick={() => handleDonationClick(donation)}
              >
                <h2>{donation.name}</h2>
                <p><strong>City:</strong> {donation.city}</p>
                <p><strong>Donation Type:</strong> {donation.donationType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Donation Details */}
      {selectedDonation && (
        <div className="donation-details">
          <button onClick={handleBackToList} className="back-button">
            Back to List
          </button>
          <h2>{selectedDonation.name}'s Donation Details</h2>
          <p><strong>Address:</strong> {selectedDonation.address}</p>
          <p><strong>City:</strong> {selectedDonation.city}</p>
          <p><strong>State:</strong> {selectedDonation.state}</p>
          <p><strong>Pincode:</strong> {selectedDonation.pincode}</p>
          <p><strong>Phone Number:</strong> {selectedDonation.phoneNumber}</p>
          <p><strong>Donation Type:</strong> {selectedDonation.donationType}</p>
          <p><strong>Quantity:</strong> {selectedDonation.quantity}</p>
          <p><strong>Submitted At:</strong> {selectedDonation.timestamp.toDate().toLocaleString()}</p>

          <div className="image-gallery">
            <h3>Images:</h3>
            {selectedDonation.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Donation ${index + 1}`}
                className="donation-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInkindDonation;
