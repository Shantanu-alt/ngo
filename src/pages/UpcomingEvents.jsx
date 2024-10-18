import React from 'react'
import Upcomingevents from '../components/Upcomingevents'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";

const UpcomingEvents = () => {
  return (
    <div>
       <Navbar />
       <PageHeader title="Create Upcoming Events" path="/upcomingevents" name="Upcoming Events" />
       <Upcomingevents />
            {/* Render CreateEvent Component */}
            <BackToTop />
            <Footer />
    </div>
  )
}

export default UpcomingEvents
