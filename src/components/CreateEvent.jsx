import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageHeader from '../components/PageHeader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../CreateEvent.css';

const MySwal = withReactContent(Swal);

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    details: '',
  });
  const [images, setImages] = useState([]); // Store multiple images
  const [uploading, setUploading] = useState(false); // Track upload state
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set today's date in YYYY-MM-DD format for the date input
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Store selected files in an array
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Set uploading state to true

    try {
      // Upload each image with unique metadata in Firebase
      const imageUploadPromises = images.map(async (image, index) => {
        const imageRef = ref(storage, `events/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        // Add each image data along with the event details to Firestore
        return addDoc(collection(db, 'events'), {
          ...eventData,
          imageUrl, // URL of the uploaded image
          createdAt: new Date(),
          formId: `image-${index + 1}`, // Unique ID for each image upload
        });
      });

      // Wait for all image uploads to complete
      await Promise.all(imageUploadPromises);

      MySwal.fire({
        icon: 'success',
        title: 'Post Done Successfully!',
        text: 'Your event has been created.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      // Reset form and state after successful upload
      setEventData({ title: '', date: '', time: '', details: '' });
      setImages([]);
    } catch (error) {
      console.error('Error adding document: ', error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="event-form-title">Create an Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            max={currentDate} // Disable future dates
            required
          />
        </div>
        <div>
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="details">Event Details</label>
          <textarea
            id="details"
            name="details"
            value={eventData.details}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="images">Upload Event Images</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple // Enable multiple file selection
            required
          />
        </div>
        <button
          type="submit"
          className={`submit-button ${uploading ? 'uploading' : ''}`}
          disabled={uploading} // Disable button during upload
        >
          {uploading ? 'Uploading...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default function Events() {
  return (
    <>
      <Navbar />
      <PageHeader title="Create Event" path="/create-event" name="Events" />
      <CreateEvent />
      <Footer />
      <BackToTop />
    </>
  );
}
