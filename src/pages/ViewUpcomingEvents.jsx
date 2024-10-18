import React from 'react'
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";
import Navbar from '../components/Navbar';
import ViewUpcoming from '../components/viewupcomingevents';

const ViewUpcomingEvents = () => {
  return (
    <div>
      <Navbar />
    <PageHeader title="View Upcoming Events" path="/viewupcomingevents" name="View Upcoming Events" />
    {/* Render CreateEvent Component */}
    <ViewUpcoming />
    <BackToTop />
    <Footer />
    </div>
  )
}

export default ViewUpcomingEvents
