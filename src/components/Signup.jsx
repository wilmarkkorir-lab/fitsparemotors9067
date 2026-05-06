import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/(?=.*[a-z])/.test(pwd)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(pwd)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/(?=.*\d)/.test(pwd)) {
      return "Password must contain at least one number.";
    }
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?])/.test(pwd)) {
      return "Password must contain at least one special character.";
    }
    return ""; // No error
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setPasswordError(""); // Clear previous password error

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const pwdValidationMsg = validatePassword(password);
      if (pwdValidationMsg) {
        setPasswordError(pwdValidationMsg);
        return; // Stop submission if password is not valid
      }

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/signup",
        data
      );

      setSuccess(response.data.message);
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");

      // Redirect to Sign In after 2 seconds
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 offer-bg">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-dark shadow-lg offer-navbar sticky-top">
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
            <Link to="/signup" className="nav-link offer-link active">Sign Up</Link>
            <Link to="/signin" className="nav-link offer-link">Sign In</Link>
            <Link to="/aboutus" className="nav-link offer-link">About Us</Link>
            <Link to="/location" className="nav-link offer-link">Location</Link>
          </div>
        </div>
      </nav>

      {/* SIGNUP CARD */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start py-5">
        <div className="card p-5 shadow-lg offer-card" style={{ maxWidth: "600px", width: "100%" }}>
          <h3 className="text-center mb-3 text-warning">Create Account</h3>

          {loading && <p className="text-warning text-center">Creating account...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
          {passwordError && <p className="text-danger text-center">{passwordError}</p>}

          <form onSubmit={submit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className="form-control mb-3"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mb-2"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value)); }}
            />
            <div className="form-check mb-4">
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

            <button type="submit" disabled={loading || !!passwordError} className="btn btn-gradient w-100 mb-3">
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="text-center mt-3 small">
              Already have an account? <Link to="/signin" className="fw-semibold text-decoration-none text-warning">Sign In</Link>
            </p>
          </form>
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

export default Signup;