import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SigninPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Show/hide password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [banners] = useState([
    "🚀 Welcome Back! Sign In Now! 🚀",
    "Access your account and grab deals!",
    "Sign in to continue your FitSpare journey!",
    "Your car parts are just a login away!"
  ]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  // Banner animation
  useEffect(() => {
    const interval1 = setInterval(() => setShowBanner(false), 2000);
    const interval2 = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
      setShowBanner(true);
    }, 4000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [banners.length]);

  // Load remembered email/password
  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberedSignin"));
    if (remembered?.email && remembered?.password) {
      setEmail(remembered.email);
      setPassword(remembered.password);
      setRemember(true);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/signin",
        data
      );

      setLoading(false);

      if (response.data.user) {
        // Store user session
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Store email & password if remember me checked
        if (remember) {
          localStorage.setItem(
            "rememberedSignin",
            JSON.stringify({ email, password })
          );
        } else {
          localStorage.removeItem("rememberedSignin");
        }

        // Automatically go to home page
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 offer-bg">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-dark shadow-lg offer-navbar sticky-top">
        <div className="container">
          <img src="/images2/logo 1.jpeg" alt="Logo" style={{ height: 40, width: 40 }} className="me-2"/>
          <Link to="/" className="navbar-brand"><b>FitSpare Motors</b></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/" className="nav-link offer-link">Home</Link>
              <Link to="/addproduct" className="nav-link offer-link">Add Product</Link>
              <Link to="/signup" className="nav-link offer-link">Sign Up</Link>
              <Link to="/signin" className="nav-link offer-link active">Sign In</Link>
              <Link to="/aboutus" className="nav-link offer-link">About Us</Link>
              <Link to="/location" className="nav-link offer-link">Location</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* SIGNIN BANNER */}
      <div className="offer-banner d-flex flex-column justify-content-center align-items-center text-center text-light">
        <h1 className={`mb-2 flash-text ${showBanner ? "show" : "hide"}`}>
          {banners[currentBanner]}
        </h1>
        <h3 className={`animated-text ${showBanner ? "show" : "hide"}`}>
          Sign in to access your account instantly!
        </h3>
      </div>

      {/* SIGNIN CARD */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start py-5">
        <div className="card p-5 shadow-lg offer-card" style={{ maxWidth: "500px", width: "100%" }}>
          <h3 className="text-center mb-3 text-warning">Sign In</h3>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control mb-2"
            />
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <button type="submit" className="btn btn-gradient w-100 mb-3" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-3 small">
            Don’t have an account? <Link to="/signup" className="fw-semibold text-decoration-none text-warning">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-dark text-light text-center py-4">
        <h5>©2026 FitSpare Motors. All Rights Reserved.</h5>
        <p>Follow us on social media for exclusive deals!</p>
      </footer>

      {/* ===== STYLES ===== */}
      <style>{`
        .offer-bg {
          background: linear-gradient(135deg, #f0f0f0, #ffe6e6, #f0f0f0);
        }
        .offer-navbar {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          font-weight: bold;
        }
        .offer-link {
          color: white !important;
          font-weight: bold;
          transition: color 0.3s, transform 0.2s;
        }
        .offer-link:hover {
          color: #ffd633 !important;
          transform: scale(1.1);
        }
        .offer-banner {
          height: 200px;
          background: linear-gradient(45deg, #ff6666, #ffcc66);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          margin-bottom: 30px;
          padding: 20px;
          border-radius: 15px;
        }
        .flash-text {
          animation: flash 1.5s infinite;
        }
        @keyframes flash {
          0%,50%,100% { opacity:1; }
          25%,75% { opacity:0; }
        }
        .animated-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          animation: appearDisappear 4s infinite;
        }
        @keyframes appearDisappear {
          0%,25%,100% { opacity:0; }
          50%,75% { opacity:1; }
        }
        .offer-card {
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #ffe6f0);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .offer-card:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .btn-gradient {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          color: white;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .btn-gradient:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default SigninPage;