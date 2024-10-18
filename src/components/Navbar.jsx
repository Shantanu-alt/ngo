import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/navbar.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [auth, setAuth] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("ADMIN_NGO");
    const isUser = localStorage.getItem("NGO");
    const email = localStorage.getItem("EMAIL");
    if (isAdmin) {
      setAuth("ADMIN");
    } else if (isUser) {
      setAuth("USER");
    }
    if (email) {
      setUserEmail(email);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    const topBar = document.querySelector(".top-bar");
    const navbar = document.querySelector(".navbar");
    function toggleStickyNavbar() {
      if (window.scrollY > topBar.offsetHeight) {
        navbar.classList.add("nav-sticky");
        topBar.classList.add("hide-top-bar");
      } else {
        navbar.classList.remove("nav-sticky");
        topBar.classList.remove("hide-top-bar");
      }
    }
    window.addEventListener("scroll", toggleStickyNavbar);
  }, []);

  const handleLoginClick = (e) => {
    if (auth) {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Already Logged In",
        text: "You are already logged in as " + auth + ".",
        confirmButtonText: "OK",
        customClass: {
          popup: "responsive-swal-popup",
          title: "responsive-swal-title",
          content: "responsive-swal-content",
          confirmButton: "responsive-swal-button",
        },
        backdrop: true,
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will be logged out.",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "responsive-swal-popup",
        title: "responsive-swal-title",
        content: "responsive-swal-content",
        confirmButton: "responsive-swal-button",
        cancelButton: "responsive-swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("ADMIN_NGO");
        localStorage.removeItem("NGO");
        localStorage.removeItem("EMAIL");
        setAuth("");
        navigate("/login");
      }
    });
  };

  return (
    <>
      {/* Top Bar Start */}
      <div className="top-bar d-none d-md-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="top-bar-left">
                <div className="text">
                  {!auth ? (
                    <Link to="/login">
                      <i
                        title="ADMIN"
                        className="fa fa-solid fa-user-tie m-0"
                        style={{ fontSize: "21px" }}
                      />
                    </Link>
                  ) : (
                    <a href="#" onClick={handleLoginClick}>
                      <i
                        title="ADMIN"
                        className="fa fa-solid fa-user-tie m-0"
                        style={{ fontSize: "21px" }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4 text-end">
              {auth && (
                <button
                  className="btn btn-light logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Top Bar End */}

      {/* Nav Bar Start */}
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/Home" className="navbar-brand">
            Team Parivartan
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav ml-auto">
              <Link
                to="/Home"
                className={`nav-item nav-link ${path === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-item nav-link ${
                  path === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/viewevents"
                className={`nav-item nav-link ${
                  path === "/event" ? "active" : ""
                }`}
              >
                Events
              </Link>
              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </Link>
                <div className="dropdown-menu">
                <Link to="/viewupcomingevents" className="dropdown-item">
                    View Upcoming Events
                  </Link>
                  <Link
                    to="/volunteer"
                    className="dropdown-item"
                  >
                    Become A Volunteer
                  </Link>
                  <hr className="dropdown-divider" />
                  <Link to="https://donation-parivartan-ngo.netlify.app/" className="dropdown-item">
                    Donate Now
                  </Link>
                  <Link to="/inkinddonate" className="dropdown-item">
                    In Kind Donation
                  </Link>
                </div>
              </div>
              <Link
                to="/contact"
                className={`nav-item nav-link ${
                  path === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Nav Bar End */}
    </>
  );
}
