import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://cyberspecter.alwaysdata.net/static/images/";

  // Fetch products from API
  const getProducts = async () => {
    setLoading("Loading products, please wait...");
    setError("");
    try {
      const response = await axios.get("https://cyberspecter.alwaysdata.net/api/get_product_details");
      setProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Failed to load products: " + err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">

  {/* NAVBAR */}
    {/* NAVBAR */}
      <nav className="navbar navbar-expand-md offer-navbar sticky-top">
        <div className="container">
          <img
            src="/images2/logo 1.jpeg"
            alt="FitSpare Logo"
            className="navbar-logo me-2"
          />
          <Link to="/" className="navbar-brand fw-bold text-light">
            FitSpare Motors
          </Link>
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
              <Link to="/" className="nav-link active">Home</Link>
              <Link to="/addproduct" className="nav-link">Add Product</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/aboutus" className="nav-link offer-link active">About Us</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* CENTERED ANIMATED OFFER WORDS */}
      <div className="offer-words d-flex justify-content-center align-items-center">
        <div className="fade-text-wrapper">
          <span className="fade-text">🔥 Best Deals on Car Parts! 🔥</span>
          <span className="fade-text">💥 Limited Time Offers! 💥</span>
          <span className="fade-text">🚗 Genuine & Affordable! 🚗</span>
          <span className="fade-text">⚡ Fast Delivery & Trusted Quality! ⚡</span>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        /* Navbar Styles */
        .offer-navbar {
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          padding: 0.8rem 1rem;
        }
        .offer-navbar .navbar-brand { font-size: 1.5rem; letter-spacing: 1px; transition: transform 0.3s; }
        .offer-navbar .navbar-brand:hover { transform: scale(1.1); color: #fff8dc; }
        .offer-navbar .nav-link { color: white; margin-left: 0.5rem; font-weight: 500; position: relative; transition: all 0.3s; }
        .offer-navbar .nav-link::after { content: ''; position: absolute; width: 0%; height: 2px; bottom: -3px; left: 0; background-color: #fff; transition: width 0.3s; }
        .offer-navbar .nav-link:hover::after { width: 100%; }
        .offer-navbar .nav-link.active { font-weight: 700; color: #ffe066; }
        .navbar-logo { height: 45px; width: 45px; border-radius: 50%; border: 2px solid #fff; transition: transform 0.3s ease; }
        .navbar-logo:hover { transform: rotate(15deg) scale(1.1); }
        .navbar-light .navbar-toggler-icon { background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/ %3E%3C/svg%3E"); }

        /* Offer words container */
        .offer-words {
          background: linear-gradient(135deg, #f0f0f0, #d9d9d9);
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .fade-text-wrapper {
          position: relative;
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .fade-text {
          position: absolute;
          opacity: 0;
          font-size: 2rem;
          font-weight: bold;
          color: #ff4500;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
          animation: fadeInOut 8s infinite;
        }

        .fade-text:nth-child(1) { animation-delay: 0s; }
        .fade-text:nth-child(2) { animation-delay: 2s; }
        .fade-text:nth-child(3) { animation-delay: 4s; }
        .fade-text:nth-child(4) { animation-delay: 6s; }

        @keyframes fadeInOut {
          0%, 20% { opacity: 0; transform: translateY(20px); }
          25%, 50% { opacity: 1; transform: translateY(0); }
          55%, 100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
      {/* ========== CAROUSEL ========== */}
 <section className="row">
      <div className="col-12">
        <div
          id="mycarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#mycarousel"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="3"></button>
          </div>

          {/* Carousel Slides */}
          <div className="carousel-inner">

            {/* Slide 1 → GetProducts */}
            <div
              className="carousel-item active"
              onClick={() => {
                if (products.length > 0) {
                  navigate("/makepayment", { state: { product: products[0] } });
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <img src="/images2/willy 90.jpeg" className="d-block w-100 carousel-img" alt="slide1" />
              <div className="carousel-caption colourful-caption">
                <span className="badge bg-warning text-dark mb-2">🔥 Special Offer Available</span>
                <h1>Welcome to FitSpare Motors</h1>
                <p>Your trusted destination for genuine car spare parts.</p>
                <p className="features">✔ Genuine Parts | ✔ Affordable Prices | ✔ Trusted Quality</p>
                <button 
                  className="btn btn-danger me-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the parent div's onClick from firing twice
                    if (products.length > 0) {
                      navigate("/makepayment", { state: { product: products[0] } });
                    }
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>

            {/* Slide 2 → AddProduct */}
            <div
              className="carousel-item"
              onClick={() => navigate("/addproduct")}
              style={{ cursor: "pointer" }}
            >
              <img src="/images2/willy 91.jpeg" className="d-block w-100 carousel-img" alt="slide2" />
              <div className="carousel-caption colourful-caption">
                <h1>Want to Sell Your Spare Parts?</h1>
                <p>Add your product quickly and reach thousands of buyers.</p>
                <p className="features">➕ Add Product | ⚙ Easy Upload | 🛠 Secure Listing</p>
                <button 
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/addproduct");
                  }}
                >Add Product</button>
              </div>
            </div>

            {/* Slide 3 → MakePayment */}
            <div
              className="carousel-item"
              onClick={() => {
                const section = document.getElementById("products-section");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ cursor: "pointer" }}
            >
              <img src="/images2/willy 93.jpeg" className="d-block w-100 carousel-img" alt="slide3" />
              <div className="carousel-caption colourful-caption">
                <h1>Secure & Easy Payment</h1>
                <p>Pay quickly and safely for the parts you need.</p>
                <p className="features">💳 Multiple Payment Options | 🔒 Safe & Reliable</p>
                <button 
                  className='btn btn-outline-light'
                  onClick={(e) => {
                    e.stopPropagation();
                    const section = document.getElementById("products-section");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View Catalog
                </button>
              </div>
            </div>

            {/* Slide 4 → SignIn / SignUp */}
            <div
              className="carousel-item"
              onClick={() => navigate("/signin")}
              style={{ cursor: "pointer" }}
            >
              <img src="/images2/willy 94.jpeg" className="d-block w-100 carousel-img" alt="slide4" />
              <div className="carousel-caption colourful-caption">
                <h1>Join FitSpare Motors</h1>
                <p>Sign in or sign up to start buying or selling today.</p>
                <p className="features">🔐 Sign In | 📝 Sign Up | ⭐ Trusted Community</p>
                <button className="btn btn-outline-light me-2" onClick={(e) => { e.stopPropagation(); navigate("/signin"); }}>Sign In</button>
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); navigate("/signup"); }}>Sign Up</button>
              </div>
            </div>

          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </div>
    </section>

      {/* PRODUCTS */}
<div id="products-section" className='row mt-5 text-center position-relative' style={{overflow:'hidden'}}>

  {/* Sparkle / floating confetti effect */}
  <div className="confetti-wrapper">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="confetti" 
        style={{ 
          '--random-x': Math.random(), 
          '--random-rot': `${Math.random() * 360}deg` 
        }}
      ></div>
    ))}
  </div>

  <h3 className='text-center text-primary mb-3 section-title'>🔥 Hot Offers - Available Products 🔥</h3>
  {loading && <h4 className='text-info mb-3'>{loading}</h4>}
  {error && <h4 className='text-danger mb-3'>{error}</h4>}

  {products.map((product, index) => (
    <div
      className='col-md-3 mb-4 fade-in-card'
      style={{ animationDelay: `${index * 0.2}s` }}
      key={product.id}
    >
      <div className='card shadow p-3 text-center hover-card gradient-card position-relative'>

        {/* Hot Deal / Limited Stock Badge */}
        <span className='badge bg-danger position-absolute top-0 start-0 m-2 deal-badge'>🔥 Hot Deal</span>
        <span className='badge bg-warning position-absolute top-0 end-0 m-2 deal-badge'>⏳ Limited Stock</span>

        {/* Product Image with Overlay */}
        <div className='img-wrapper position-relative overflow-hidden'>
          <img
            src={img_url + product.product_photo}
            alt={product.product_photo}
            className='product_img mt-3'
          />
          <div className='img-overlay'>
            <button
              className='btn btn-outline-light quick-btn'
              onClick={() => navigate('/makepayment', { state: { product } })}
            >
              Quick Buy
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className='card-body'>
          <h5 className='mt-2 fw-bold'>{product.product_name}</h5>
          <p className='text-muted'>{product.product_description}</p>
          <b className='text-warning fs-5 price-highlight'>ksh: {product.product_cost}</b> <br />
          <button
            className='btn btn-primary mt-2 btn-animate'
            onClick={() => navigate('/makepayment', { state: { product } })}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ))}

  {/* Styles */}
  <style>{`
    /* Fade-in animation for products */
    .fade-in-card {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Card hover & gradient background */
    .gradient-card {
      background: linear-gradient(145deg, #fff1f0, #ffe3e3);
      border-radius: 15px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .hover-card:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 35px rgba(0,0,0,0.35);
    }

    /* Product image */
    .product_img {
      height: 200px;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
      transition: transform 0.5s ease, filter 0.5s ease;
    }
    .hover-card:hover .product_img {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    /* Image overlay for Quick Buy */
    .img-wrapper {
      position: relative;
    }
    .img-overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex; justify-content: center; align-items: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      border-radius: 10px;
    }
    .img-wrapper:hover .img-overlay {
      opacity: 1;
    }
    .quick-btn {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .quick-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(255,255,255,0.6);
    }

    /* Buy button animation */
    .btn-animate {
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    .btn-animate::after {
      content: '';
      position: absolute;
      width: 100%; height: 0;
      top: 0; left: 0;
      background: rgba(255,255,255,0.2);
      transition: 0.4s;
    }
    .btn-animate:hover::after {
      height: 100%;
    }
    .btn-animate:hover {
      transform: scale(1.05);
    }

    /* Price highlight */
    .price-highlight {
      font-size: 1.2rem;
      color: #ff4500;
      font-weight: bold;
      transition: color 0.5s ease;
    }
    .hover-card:hover .price-highlight {
      color: #ff6f00;
    }

    /* Deal badges */
    .deal-badge {
      font-size: 0.9rem;
      padding: 5px 10px;
      border-radius: 8px;
    }

    /* Floating confetti / sparkle effect */
    .confetti-wrapper {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
    .confetti {
      position: absolute;
      width: 8px; height: 8px;
      background: linear-gradient(45deg, #ff0, #f0f);
      opacity: 0.8;
      border-radius: 50%;
      animation: confetti-fall 5s linear infinite;
      top: -10px;
      left: calc(100% * var(--random-x));
      transform: rotate(var(--random-rot)deg);
    }
    @keyframes confetti-fall {
      0% { transform: translateY(0) rotate(var(--random-rot)deg); opacity:1; }
      100% { transform: translateY(110vh) rotate(calc(var(--random-rot) + 360deg)); opacity:0; }
    }
  `}</style>
</div>
            {/* ========== FOOTER ========== */}
      <footer className="mt-auto">
        <section className="row bg-danger text-light p-4">
          <div className="col-md-3 text-center mb-4">
            <h4>About Us</h4>
            <p>FitSpare Motors provides top-quality car spare parts and engine components you can trust. We focus on reliability and durability to keep your vehicle running smoothly.</p>
            <p>Our team is committed to helping you find the right parts quickly and easily. Your satisfaction and your car’s performance come first.</p>
          </div>

          <div className="col-md-3 text-center mb-4">
            <h4>Contact Us</h4>
            <form>
              <input type="email" placeholder="Enter your email" className="form-control mb-3"/>
              <textarea className="form-control mb-3" rows="3" placeholder="Leave a comment"></textarea>
              <button className="btn btn-primary">Send</button>
            </form>
          </div>

          <div className="col-md-3 text-center mb-4">
            <h4>Stay Connected</h4>
            <p>Stay connected with FitSpare Motors on social media! Follow us on Facebook, Instagram, WhatsApp, and LinkedIn to get updates on new car parts, special offers, promotions, and tips to keep your vehicle running smoothly. Join our community and never miss out!</p>
            <div className="d-flex justify-content-center gap-2">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src="/images2/faba.jpeg" alt="Facebook" width="40" height="40" />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                <img src="/images2/wats.jpg" alt="WhatsApp" width="40" height="40" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src="/images2/insta.jpeg" alt="Instagram" width="40" height="40" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <img src="/images2/linked.jpeg" alt="LinkedIn" width="40" height="40" />
              </a>
            </div>
          </div>

          <div className="col-md-3 text-center mb-4">
            <img src="/images2/logo 2.jpeg" alt="logo" style={{ width: 300, height: 300 }} />
          </div>
        </section>

        <section className="bg-dark text-light text-center py-3">
          <h5 className="fs-6 mt-2">
            Developed by Wilmark Kipkirui Korir. &copy;2026. All rights reserved.
          </h5>
        </section>
      </footer>

    </div>
  );
};

export default GetProducts;