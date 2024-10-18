import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../upcomingevents.css"; // CSS for styling

const Upcomingevents = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [participation, setParticipation] = useState(false);
  const [donationType, setDonationType] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationQuantity, setDonationQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      // Ensure an image is selected before proceeding
      if (image) {
        const imageRef = ref(storage, `events/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } else {
        alert("Please select an image");
        return;
      }

      // Add event data to Firestore in 'upcomingEvents' collection
      await addDoc(collection(db, "upcomingEvents"), {
        title,
        imageUrl,
        date,
        time,
        venue,
        participation,
        donationType,
        donationAmount: donationType === "money" ? donationAmount : null,
        donationQuantity: donationType === "material" ? donationQuantity : null,
      });

      alert("Event created successfully!");
      // Clear form fields
      setTitle("");
      setImage(null);
      setDate("");
      setTime("");
      setVenue("");
      setParticipation(false);
      setDonationType("");
      setDonationAmount("");
      setDonationQuantity("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding event: " + error.message);
    }
  };

  return (
    <div className="event-form-container">
      <h2>Create Upcoming Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Venue:</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={participation}
              onChange={(e) => setParticipation(e.target.checked)}
            />
            Do you want to participate in the event?
          </label>
        </div>

        <div>
          <label>Donation Type:</label>
          <select
            value={donationType}
            onChange={(e) => {
              setDonationType(e.target.value);
              if (e.target.value === "money") {
                window.location.href =
                  "https://donation-parivartan-ngo.netlify.app/";
              }
            }}
          >
            <option value="">None</option>
            <option value="money">Money Donation</option>
            <option value="material">Materialistic Donation</option>
          </select>
        </div>

        {donationType === "material" && (
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              value={donationQuantity}
              onChange={(e) => setDonationQuantity(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default Upcomingevents;
