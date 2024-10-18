import "../css/footer.css";
import logo from '../assets/logo.jpg';  // Adjust the path as needed

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 footer-contact">
            <h2>Contact Us</h2>
            <a
              href="https://maps.app.goo.gl/wAXYzrg2UXH3oVmX9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>
                <i className="fa fa-map-marker-alt"></i>Kalyan, India,
                Maharashtra
              </p>
            </a>
            <a href="tel:+91-8080171430">
              <p>
                <i className="fa fa-phone"></i>080801 71430
              </p>
            </a>
            <a href="mailto:teamparivartan8080@gmail.com">
              <p>
                <i className="fa fa-envelope"></i>teamparivartan8080@gmail.com
              </p>
            </a>
            <div className="footer-social">
              <a className="btn btn-custom" href="/">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a className="btn btn-custom" href="/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-custom" href="/">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="btn btn-custom" href="/">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="btn btn-custom" href="/">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 footer-link">
            <h2>Popular Links</h2>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/event">Popular Causes</a>
            <a href="/event">Upcoming Events</a>
            <a href="#">Latest Blog</a>
          </div>
          <div className="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={logo} // Update with your logo's path
              alt="Logo"
              className="footer-logo"
            />
          </div>
        </div>
      </div>
      <div className="container copyright">
        <div className="row">
          <div className="col-md-6">
            <p>
              &copy; <a href="#">Team Parivartan NGO</a> | 2024, All Right
              Reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p>
              Designed By <a href="/">Team COPO - VPPCOE@COMPS</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
