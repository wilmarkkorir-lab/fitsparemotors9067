import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_cost, setProduct_cost] = useState("");
  const [product_photo, setProduct_photo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
      setProduct_photo(null);
      setPreviewUrl(null);
      return;
    }
    setProduct_photo(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("product_name", product_name);
      data.append("product_description", product_description);
      data.append("product_cost", product_cost);
      data.append("product_photo", product_photo);

      const response = await axios.post(
        "https://cyberspecter.alwaysdata.net/api/add_product",
        data
      );

      setSuccess(response.data.message || "Product added successfully!");
      setProduct_name("");
      setProduct_description("");
      setProduct_cost("");
      setProduct_photo(null);
      setPreviewUrl(null);
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
              <Link to="/addproduct" className="nav-link offer-link active">Add Product</Link>
              <Link to="/signup" className="nav-link offer-link">Sign Up</Link>
              <Link to="/signin" className="nav-link offer-link">Sign In</Link>
              <Link to="/aboutus" className="nav-link offer-link">About Us</Link>
              <Link to="/location" className="nav-link offer-link">Location</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* OFFER BANNER */}
      <div className="offer-banner d-flex flex-column justify-content-center align-items-center text-center text-light">
        <h1 className="mb-2 flash-text">🔥 HOT DEALS ALERT! 🔥</h1>
        <h3 className="animated-text">Add your products now and grab attention! Limited Time Offer!</h3>
      </div>

      {/* ADD PRODUCT FORM */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start py-5">
        <div className="card p-4 shadow-lg offer-card">
          <h3 className="text-center mb-3 text-warning">Add Product</h3>

          {loading && <p className="text-warning text-center">Adding product...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <form onSubmit={submit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Product Name"
              required
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Product Description"
              rows={3}
              required
              value={product_description}
              onChange={(e) => setProduct_description(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Price (Ksh)"
              required
              value={product_cost}
              onChange={(e) => setProduct_cost(e.target.value)}
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              required
              onChange={handleFileChange}
            />

            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="img-fluid mb-3" style={{ maxHeight: 150, borderRadius: 10 }} />
            )}

            <button type="submit" className="btn btn-gradient w-100 mb-2" disabled={loading || !product_photo}>
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button className="btn btn-secondary w-100" onClick={() => navigate("/")}>
              Go Back
            </button>
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
        /* Background Gradient */
        .offer-bg {
          background: linear-gradient(135deg, #f0f0f0, #ffe6e6, #f0f0f0);
        }

        /* Navbar */
        .offer-navbar {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          font-weight: bold;
        }

        /* Offer Banner */
        .offer-banner {
          height: 250px;
          background: linear-gradient(45deg, #ff6666, #ffcc66);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          margin-bottom: 30px;
          padding: 20px;
          border-radius: 15px;
        }

        /* Flashing and animated text */
        .flash-text {
          animation: flash 1.5s infinite;
        }

        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }

        .animated-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          animation: appearDisappear 4s infinite;
        }

        @keyframes appearDisappear {
          0%, 25%, 100% { opacity: 0; }
          50%, 75% { opacity: 1; }
        }

        /* Product Card */
        .offer-card {
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #ffe6f0);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .offer-card:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        /* Buttons */
        .btn-gradient {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          color: white;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .btn-gradient:hover {
          transform: scale(1.05);
        }nn
      `}</style>
    </div>
  );
};

export default AddProduct;