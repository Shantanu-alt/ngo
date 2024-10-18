import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import "../login.css";
import logo from '../assets/logo.jpg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("NGO", "USER"); // Set user role in localStorage
      localStorage.setItem("isLoggedIn", "true"); // Set login status
  
      // Show success alert
      Swal.fire({
        title: 'Logged in successfully!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'Okay',
        backdrop: true,
        timer: 3000,
      }).then(() => {
        navigate("/Home");
      });
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("NGO", "USER"); // Set user role in localStorage
      localStorage.setItem("isLoggedIn", "true"); // Set login status
  
      // Show success alert for Google login
      Swal.fire({
        title: 'Logged in successfully!',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'Okay',
        backdrop: true,
        timer: 3000,
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      setError("Failed to log in with Google.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            {error && <p className="error">{error}</p>}
          </form>
          <button className="google-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
      </div>
    </div>
  );
}
