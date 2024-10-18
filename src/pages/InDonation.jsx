import React from 'react'
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import InkindDonation from '../components/InkindDonation';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";

const InDonation = () => {
  return (
    <>
    <Navbar />
    <PageHeader title="In-Kind Donation" path="/inkinddonation" name="In-Kind Donate" />
    {/* Render CreateEvent Component */}
    <InkindDonation />
    <BackToTop />
    <Footer />
</>
  )
}

export default InDonation
