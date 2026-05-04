import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/addproduct");
  };

  return (
    <div className="d-flex flex-column min-vh-100 about-bg">

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
              <Link to="/signin" className="nav-link offer-link">Sign In</Link>
              <Link to="/aboutus" className="nav-link offer-link active">About Us</Link>
              <Link to="/location" className="nav-link offer-link">Location</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-banner d-flex flex-column justify-content-center align-items-center text-center text-light">
        <h1 className="mb-3 flash-text">Welcome to FitSpare Motors</h1>
        <p className="animated-text lead">
          Your trusted source for high-quality car parts & accessories
        </p>
      </div>

      {/* MISSION STATEMENT */}
      <div className="container py-5">
        <div className="row align-items-center justify-content-center mb-5">
          <div className="col-md-4 text-center">
            <img src="/images2/logo 1.jpeg" alt="Our Mission" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-5 text-center">
            <h2 className="text-warning mb-3 display-4 fw-bold">Our Mission</h2>
            <p className="fs-4">
              FitSpare Motors is committed to providing reliable, durable, and high-quality car parts. 
              Our goal is to keep your vehicle running smoothly while ensuring customer satisfaction and trust.
            </p>
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="text-center mb-5">
          <h2 className="text-warning mb-4">Meet Our Team</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card shadow hover-card">
                <img src="/images2/wilmark.jpeg" alt="Team Member" className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">Wilmark Korir</h5>
                  <p className="card-text">Founder & Developer</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow hover-card">
                <img src="/images2/jane.jpeg" alt="Team Member" className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">Jane Doe</h5>
                  <p className="card-text">Operations Manager</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow hover-card">
                <img src="/images2/john.jpeg" alt="Team Member" className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">John Smith</h5>
                  <p className="card-text">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="text-center mb-5">
          <h2 className="text-warning mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="service-card p-4 shadow">
                <h4>High Quality</h4>
                <p>All our parts meet strict quality standards for durability and performance.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="service-card p-4 shadow">
                <h4>Fast Delivery</h4>
                <p>Receive your orders quickly so your vehicle gets back on the road sooner.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="service-card p-4 shadow">
                <h4>Trusted Support</h4>
                <p>Our expert team is always ready to help you with advice and guidance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <button onClick={handleExplore} className="btn btn-gradient btn-lg">
            Explore Products
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-dark text-light text-center py-4">
        <h5>©2026 FitSpare Motors. All Rights Reserved.</h5>
        <p>Follow us on social media for exclusive deals!</p>
      </footer>

      {/* STYLES */}
      <style>{`
        .about-bg {
          background: linear-gradient(135deg, #f0f0f0, #ffe6e6, #f0f0f0);
        }
        .hero-banner {
          height: 250px;
          background: linear-gradient(45deg, #ff6666, #ffcc66);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-shadow: 1px 1px 5px #000;
          margin-bottom: 30px;
          border-radius: 15px;
        }
        .flash-text {
          animation: flash 1.5s infinite;
        }
        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animated-text {
          animation: appearDisappear 4s infinite;
        }
        @keyframes appearDisappear {
          0%, 25%, 100% { opacity: 0; }
          50%, 75% { opacity: 1; }
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
        .hover-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hover-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }
        .hover-card .card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .card-img-top {
          height: 250px;
          object-fit: cover;
        }
        .service-card {
          height: 100%;
          border-radius: 15px;
          background: linear-gradient(135deg, #fff4f4, #ffe6e6);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .service-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
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

export default AboutUs;