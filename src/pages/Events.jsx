import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Initiatives from '../components/Initiatives';
import BackToTop from '../components/BackToTop';
import PageHeader from "../components/PageHeader";
import CreateEvent from '../components/CreateEvent'; // Import CreateEvent component

export default function Events() {
    return (
        <>
            <Navbar />
            {/* Render CreateEvent Component */}
            <CreateEvent />
            <BackToTop />
        </>
    );
}
