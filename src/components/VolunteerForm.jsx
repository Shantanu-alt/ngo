import React, { useState } from 'react';
import { auth } from '../firebase'; // Make sure to adjust the import path based on your setup
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore imports
import Swal from 'sweetalert2';
import '../VolunteerForm.css'; // Create a separate CSS file for styles

const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        mobile: '',
        volunteering: '',
        preferredRole: '',
        areasOfInterest: '',
        previousExperience: '',
        motivation: '',
        inspiration: '',
        goals: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const wordCountCheck = (text) => {
            return text.split(/\s+/).filter(Boolean).length >= 100; // Check for minimum 100 words
        };

        if (
            !wordCountCheck(formData.motivation) ||
            !wordCountCheck(formData.inspiration) ||
            !wordCountCheck(formData.goals)
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please ensure that "Why do you want to volunteer?", "What inspires you?", and "What do you hope to achieve?" contain at least 100 words each.',
            });
            return;
        }

        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const db = getFirestore();
            const volunteerCollection = collection(db, "volunteers");
            await addDoc(volunteerCollection, {
                ...formData,
                email: user.email,
                createdAt: new Date(),
            });

            Swal.fire({
                icon: 'success',
                title: 'Form Submitted Successfully!',
                text: 'Thank you for your interest in volunteering with Team Parivartan NGO!',
            });

            console.log("Form Data:", formData);
        } catch (error) {
            console.error('Error during sign in or data submission:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong during Google authentication or data submission!',
            });
        }
    };
    
  return (
    <div className="volunteer-form-container">
      <h2>Team Parivartan NGO Volunteering Form</h2>
      <form className="volunteer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Age*</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile number*</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="volunteering">Are you interested in volunteering?*</label>
          <select
            id="volunteering"
            name="volunteering"
            value={formData.volunteering}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="preferredRole">Preferred Volunteer Role*</label>
          <select
            id="preferredRole"
            name="preferredRole"
            value={formData.preferredRole}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Event Coordinator">Event Coordinator</option>
            <option value="Tutor">Tutor</option>
            <option value="Fundraiser">Fundraiser</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="areasOfInterest">Areas of interest*</label>
          <select
            id="areasOfInterest"
            name="areasOfInterest"
            value={formData.areasOfInterest}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="previousExperience">Do you have any previous volunteer experience? If yes, please provide details.*</label>
          <textarea
            id="previousExperience"
            name="previousExperience"
            value={formData.previousExperience}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="motivation">Why do you want to volunteer with Team Parivartan NGO?*</label>
          <textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="inspiration">What specific aspect of our organization's mission inspires you the most?*</label>
          <textarea
            id="inspiration"
            name="inspiration"
            value={formData.inspiration}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="goals">What do you hope to achieve during your time as a volunteer with us?*</label>
          <textarea
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
