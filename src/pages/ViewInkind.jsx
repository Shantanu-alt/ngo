import React from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import ViewInkindDonation from '../components/ViewInkindDonation';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";

const ViewInkind = () => {
  return (
    <div>
         <>
    <Navbar />
    <PageHeader title="View In-Kind Donation" path="/inkinddonation" name="All In-Kind Donations" />
    {/* Render CreateEvent Component */}
    <ViewInkindDonation />
    <BackToTop />
    <Footer />
</>
      
    </div>
  )
}

export default ViewInkind
