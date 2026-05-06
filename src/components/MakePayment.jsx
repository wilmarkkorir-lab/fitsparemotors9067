import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MakePayment = () => {
  const navigate = useNavigate();
  const img_url = "https://cyberspecter.alwaysdata.net/static/images/";
  const { product, cart } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart
    ? cart.reduce((sum, item) => sum + item.product_cost * item.qty, 0)
    : product?.product_cost;

  const submit = async (e) => {
    e.preventDefault();
    if (!phone) { setError("Enter phone number"); return; }
    setLoading(true);
    setError("");
    setMessage("Processing payment...");
    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", totalAmount);
      const response = await axios.post("https://cyberspecter.alwaysdata.net/api/mpesa_payment", data);
      setMessage(response.data.message || "Payment request sent to phone ✔");
      setPhone("");
      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!product && !cart) {
    return (
      <div style={styles.page}>
        <p style={{ color: "#ff6b6b", textAlign: "center", marginTop: 80, fontSize: 18 }}>
          ⚠ No product selected.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Ambient blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <img src="/images2/mpesa.jpg" alt="Mpesa" style={styles.mpesaLogo} />
          <h2 style={styles.title}>Lipa na M-Pesa</h2>
          <p style={styles.subtitle}>Secure Mobile Payment</p>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Product / Cart images */}
        <div style={styles.productSection}>
          {cart ? (
            <div style={styles.cartImages}>
              {cart.map((item, idx) => (
                <img
                  key={idx}
                  src={img_url + item.product_photo}
                  alt={item.product_name}
                  style={styles.cartThumb}
                />
              ))}
            </div>
          ) : (
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              style={styles.productImg}
            />
          )}

          <div style={styles.productInfo}>
            <p style={styles.productName}>
              {cart ? `Cart — ${cart.length} item${cart.length > 1 ? "s" : ""}` : product.product_name}
            </p>
            <p style={styles.productDesc}>
              {cart ? cart.map((i) => i.product_name).join(" · ") : product.product_description}
            </p>
          </div>
        </div>

        {/* Amount pill */}
        <div style={styles.amountPill}>
          <span style={styles.amountLabel}>Total</span>
          <span style={styles.amountValue}>KSh {Number(totalAmount).toLocaleString()}</span>
        </div>

        {/* Alerts */}
        {message && (
          <div style={styles.alertSuccess}>
            <span>✅</span> {message}
          </div>
        )}
        {error && (
          <div style={styles.alertError}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} style={{ marginTop: 8 }}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📱</span>
            <input
              type="tel"
              placeholder="254 7XX XXX XXX"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#00e676")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...styles.btnPay, ...styles.btnPayLoading } : styles.btnPay}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? (
              <span style={styles.spinner}>⏳ Processing…</span>
            ) : (
              "Pay Now →"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={styles.btnBack}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ← Go Back
          </button>
        </form>

        {/* Footer note */}
        <p style={styles.footerNote}>🔒 Secured by Safaricom M-Pesa</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50% { opacity:.8; transform:scale(1.08); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0f0d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 16px",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-120px", left: "-120px",
    width: 420, height: 420,
    background: "radial-gradient(circle, rgba(0,230,118,0.18) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-100px", right: "-100px",
    width: 360, height: 360,
    background: "radial-gradient(circle, rgba(0,188,212,0.14) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "pulse 8s ease-in-out infinite reverse",
    pointerEvents: "none",
  },
  card: {
    width: "100%", maxWidth: 440,
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 28,
    padding: "36px 32px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
    animation: "fadeUp .5s ease both",
    position: "relative",
  },
  header: { textAlign: "center", marginBottom: 4 },
  mpesaLogo: {
    height: 40, borderRadius: 8,
    marginBottom: 12,
    boxShadow: "0 4px 16px rgba(0,230,118,0.3)",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 28, fontWeight: 800,
    margin: "0 0 4px",
    background: "linear-gradient(135deg, #00e676, #69f0ae)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 12, margin: 0,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(0,230,118,0.3), transparent)",
    margin: "24px 0",
  },
  productSection: { textAlign: "center", marginBottom: 20 },
  cartImages: {
    display: "flex", justifyContent: "center",
    gap: 8, flexWrap: "wrap", marginBottom: 12,
  },
  cartThumb: {
    width: 56, height: 56, objectFit: "cover",
    borderRadius: 12,
    border: "2px solid rgba(0,230,118,0.3)",
  },
  productImg: {
    maxHeight: 160, maxWidth: "100%",
    objectFit: "contain", borderRadius: 14,
    marginBottom: 12,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  productName: {
    fontFamily: "'Syne', sans-serif",
    color: "#fff", fontSize: 16,
    fontWeight: 700, margin: "0 0 4px",
  },
  productDesc: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13, margin: 0,
    lineHeight: 1.5,
  },
  amountPill: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(0,230,118,0.08)",
    border: "1px solid rgba(0,230,118,0.2)",
    borderRadius: 14,
    padding: "14px 20px",
    marginBottom: 20,
  },
  amountLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13, letterSpacing: 1,
    textTransform: "uppercase",
  },
  amountValue: {
    fontFamily: "'Syne', sans-serif",
    color: "#00e676", fontSize: 22,
    fontWeight: 800, letterSpacing: "-0.5px",
  },
  alertSuccess: {
    background: "rgba(0,230,118,0.1)",
    border: "1px solid rgba(0,230,118,0.3)",
    color: "#69f0ae", borderRadius: 12,
    padding: "12px 16px", fontSize: 14,
    marginBottom: 14, display: "flex", gap: 8, alignItems: "center",
  },
  alertError: {
    background: "rgba(255,82,82,0.1)",
    border: "1px solid rgba(255,82,82,0.3)",
    color: "#ff8a80", borderRadius: 12,
    padding: "12px 16px", fontSize: 14,
    marginBottom: 14, display: "flex", gap: 8, alignItems: "center",
  },
  inputWrapper: {
    position: "relative", marginBottom: 14,
  },
  inputIcon: {
    position: "absolute", left: 16, top: "50%",
    transform: "translateY(-50%)", fontSize: 16,
    pointerEvents: "none",
  },
  input: {
    width: "100%", padding: "14px 16px 14px 46px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14, color: "#fff",
    fontSize: 15, outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  btnPay: {
    width: "100%", padding: "15px",
    background: "linear-gradient(135deg, #00e676, #00c853)",
    color: "#051a0f", fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 16,
    border: "none", borderRadius: 14,
    cursor: "pointer", marginBottom: 10,
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 8px 32px rgba(0,230,118,0.35)",
    letterSpacing: 0.3,
  },
  btnPayLoading: {
    opacity: 0.7, cursor: "not-allowed",
    background: "linear-gradient(135deg, #4caf50, #388e3c)",
  },
  btnBack: {
    width: "100%", padding: "13px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14, color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, cursor: "pointer",
    transition: "background 0.2s",
  },
  footerNote: {
    textAlign: "center",
    color: "rgba(255,255,255,0.2)",
    fontSize: 11, marginTop: 20, marginBottom: 0,
    letterSpacing: 0.5,
  },
};

export default MakePayment;