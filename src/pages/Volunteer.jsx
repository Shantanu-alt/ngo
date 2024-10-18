import React from 'react'
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";
import VolunteerForm from '../components/VolunteerForm';
import Navbar from '../components/Navbar';

const Volunteer = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="Become an Volunteer" path="/volunteer" name="Volunteer Registration" />
    {/* Render CreateEvent Component */}
    <VolunteerForm />
    <BackToTop />
    <Footer />
</>
  )
}

export default Volunteer
