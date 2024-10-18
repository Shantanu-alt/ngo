import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase'; // Adjust the path as per your structure
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2'; // SweetAlert2 import
import '../InkindDonation.css'; // CSS for styling

const InkindDonation = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    state: '',
    city: '',
    pincode: '',
    donationType: 'Clothes',
    quantity: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // Optionally, redirect to login page or show a message
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You must be logged in with Google to submit this form.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images to Firebase Storage
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `donations/${image.name}`);
          await uploadBytes(storageRef, image);
          return await getDownloadURL(storageRef);
        })
      );

      // Save form data and image URLs to Firestore
      await addDoc(collection(db, 'inkindDonations'), {
        ...formData,
        images: imageUrls,
        timestamp: new Date(),
      });

      Swal.fire({
        icon: 'success',
        title: 'Donation Submitted!',
        text: 'Thank you for your generous donation.',
        confirmButtonText: 'OK',
        timer: 3000,
        background: '#e6f5ea', // Light green background
        iconColor: '#32a852', // Green tick icon
        showConfirmButton: true,
      });

      // Reset form data after submission
      setFormData({
        name: '',
        address: '',
        phoneNumber: '',
        state: '',
        city: '',
        pincode: '',
        donationType: 'Clothes',
        quantity: '',
      });
      setImages([]);
    } catch (error) {
      console.error('Error submitting donation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting the donation. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donation-form-container">
      <h2 className="form-title">In-Kind Donation Form</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'address', 'phoneNumber', 'state', 'city', 'pincode', 'quantity'].map((field) => (
          <div key={field} className="form-group">
            <label className="form-label" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
        ))}

        <div className="form-group">
          <label className="form-label">Type of Donation</label>
          <select
            name="donationType"
            value={formData.donationType}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Stationary Items">Stationary Items</option>
            <option value="Food Items">Food Items</option>
            <option value="Electronic Items">Electronic Items</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  );
};

export default InkindDonation;
