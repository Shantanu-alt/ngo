import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";
import ViewVolunteer from '../components/ViewVolunteer';

const VolunteerReq = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="Volunteer Request" path="/volunteerreuquest" name="Volunteer" />
    {/* Render CreateEvent Component */}
    <ViewVolunteer/>
    <BackToTop />
    <Footer />
</>
  )
}

export default VolunteerReq
