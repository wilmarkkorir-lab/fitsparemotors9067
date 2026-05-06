import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// ── CHAT ANSWERS ──
const chatAnswers = [
  // GREETINGS
  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'hii', 'hallo'], answer: "Hello! 👋 Welcome to FitSpare Motors! I'm here to help you find the right car parts. What do you need today?" },
  { keywords: ['how are you', 'how r you', 'how are u'], answer: "I'm doing great, thank you! 😊 Ready to help you find the best car parts. What can I assist you with?" },

  // PRODUCTS
  { keywords: ['brake', 'brake pad', 'brake pads', 'brakes', 'disc'], answer: "🔧 Yes! We stock brake pads and brake discs for Toyota, Nissan, Subaru, Mitsubishi, Honda, and more. Search 'brake' in the search bar above to see all available options!" },
  { keywords: ['engine oil', 'oil', 'lubricant', 'motor oil'], answer: "🛢️ We carry engine oils in various grades — 5W-30, 10W-40, 15W-40. Suitable for petrol and diesel engines. Search 'oil' in the product search bar above!" },
  { keywords: ['air filter', 'airfilter', 'cabin filter', 'filter'], answer: "🌬️ We stock air filters, cabin filters, and oil filters for most car models. Search 'filter' above to find one that matches your car!" },
  { keywords: ['spark plug', 'sparkplug', 'spark plugs', 'ignition'], answer: "⚡ Yes! We have spark plugs for all major brands — NGK, Denso, Bosch. Works for Toyota, Nissan, Subaru, Honda, and more. Search 'spark' above!" },
  { keywords: ['shock absorber', 'shock', 'shocks', 'absorber', 'suspension'], answer: "🚗 We stock front and rear shock absorbers for Toyota, Nissan, Subaru, Mitsubishi, and more. Search 'shock' above to browse available stock!" },
  { keywords: ['battery', 'car battery', 'batteries'], answer: "🔋 We have car batteries in different sizes — 35Ah, 45Ah, 55Ah, 75Ah. Brands include Exide and Amaron. Search 'battery' in the search bar!" },
  { keywords: ['clutch', 'clutch plate', 'clutch disc', 'pressure plate'], answer: "⚙️ We stock clutch kits including the clutch plate, pressure plate, and bearing for Toyota, Nissan, Subaru, and more. Search 'clutch' above!" },
  { keywords: ['radiator', 'cooling', 'coolant', 'overheating'], answer: "🌡️ We have radiators and coolants available. If your car is overheating, the right radiator or coolant can fix it. Search 'radiator' or 'coolant' above!" },
  { keywords: ['gearbox', 'transmission', 'gear'], answer: "🔩 We carry gearbox parts and transmission components. Search 'gearbox' or visit our shop for expert advice on your specific car model!" },
  { keywords: ['exhaust', 'muffler', 'silencer'], answer: "💨 Yes! We stock exhaust pipes, mufflers, and silencers. Search 'exhaust' above to find the right fit for your car!" },
  { keywords: ['alternator', 'generator', 'charging'], answer: "⚡ We have alternators for Toyota, Nissan, Subaru, and more. If your battery keeps dying, a faulty alternator may be the issue. Search 'alternator' above!" },
  { keywords: ['starter', 'starter motor', 'starting motor'], answer: "🔑 We stock starter motors for most car models. Search 'starter' above or contact us with your car model for guidance!" },
  { keywords: ['tyre', 'tire', 'tyres', 'tires', 'rim', 'rims', 'wheel'], answer: "🚗 We stock tyres and rims for various car models and sizes. Search 'tyre' or 'rim' above. We can also advise on the right size for your car!" },
  { keywords: ['headlight', 'tail light', 'light', 'lamp', 'bulb', 'indicator'], answer: "💡 We have headlights, tail lights, indicators, and bulbs. Search 'light' or 'lamp' in the search bar to see what's available!" },
  { keywords: ['mirror', 'side mirror', 'wing mirror'], answer: "🪞 We stock side mirrors for Toyota, Nissan, Subaru, and more. Search 'mirror' above!" },
  { keywords: ['bumper', 'body part', 'bonnet', 'hood', 'fender', 'door'], answer: "🚗 We carry various body parts including bumpers, bonnets, fenders, and doors. Contact us with your car model and year for availability!" },
  { keywords: ['wiper', 'windscreen', 'windshield', 'wipers'], answer: "🌧️ We have wiper blades and windscreens for most cars. Search 'wiper' above or tell us your car model!" },

  // CAR BRANDS
  { keywords: ['toyota', 'corolla', 'hilux', 'prado', 'land cruiser', 'vitz', 'fielder', 'harrier', 'rav4'], answer: "🚗 Great choice! We stock many parts for Toyota — Corolla, Hilux, Prado, Land Cruiser, Vitz, Fielder, Harrier, and RAV4. Search the part you need above!" },
  { keywords: ['nissan', 'x-trail', 'tiida', 'note', 'patrol', 'navara', 'march'], answer: "🚗 Yes! We have parts for Nissan — X-Trail, Tiida, Note, Patrol, Navara, March, and more. Search the part you need above!" },
  { keywords: ['subaru', 'forester', 'outback', 'impreza', 'legacy', 'brz'], answer: "🚗 We stock parts for Subaru models — Forester, Outback, Impreza, Legacy, and BRZ. Search the specific part above!" },
  { keywords: ['mitsubishi', 'pajero', 'outlander', 'colt', 'eclipse'], answer: "🚗 We have parts for Mitsubishi — Pajero, Outlander, Colt, Eclipse, and more. Search the part you need above!" },
  { keywords: ['honda', 'fit', 'civic', 'crv', 'accord', 'jazz'], answer: "🚗 We stock parts for Honda — Fit, Civic, CR-V, Accord, and Jazz. Search the specific part you need above!" },
  { keywords: ['volkswagen', 'vw', 'golf', 'polo', 'passat', 'tiguan'], answer: "🚗 We carry parts for Volkswagen — Golf, Polo, Passat, and Tiguan. Search the part above or contact us for specific model availability!" },
  { keywords: ['mercedes', 'benz', 'bmw', 'audi', 'european'], answer: "🚗 We stock some European car parts for Mercedes, BMW, and Audi. Contact us directly for availability as stock varies!" },
  { keywords: ['isuzu', 'dmax', 'd-max', 'trooper', 'npr'], answer: "🚗 We have parts for Isuzu — D-Max, Trooper, NPR trucks, and more. Search the part or contact us for availability!" },
  { keywords: ['mazda', 'cx-5', 'demio', 'atenza', 'familia'], answer: "🚗 We stock parts for Mazda — CX-5, Demio, Atenza, and Familia. Search the part above!" },
  { keywords: ['suzuki', 'swift', 'alto', 'vitara', 'jimny'], answer: "🚗 We carry parts for Suzuki — Swift, Alto, Vitara, and Jimny. Search 'suzuki' or the specific part name above!" },

  // PRICING
  { keywords: ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable', 'bei'], answer: "💰 All product prices are shown on each product card. We offer competitive and affordable prices. Use the search bar to find the part and check its price!" },
  { keywords: ['discount', 'offer', 'sale', 'deal', 'promo', 'coupon'], answer: "🔥 Yes! We have hot deals running. Check our product listings for the best prices!" },
  { keywords: ['negotiate', 'bargain', 'lower price', 'reduce price'], answer: "🤝 For bulk orders or special requests, contact us on 📞 0705387545 and we'll see what we can do for you!" },
  { keywords: ['bulk', 'wholesale', 'many', 'large order', 'fleet'], answer: "📦 We offer special pricing for bulk and wholesale orders! Call us on 📞 0705387545 to discuss bulk pricing for your fleet or business!" },

  // PAYMENT
  { keywords: ['payment', 'pay', 'mpesa', 'm-pesa', 'cash', 'card', 'lipa', 'checkout'], answer: "💳 We accept M-Pesa, cash, and card payments. Click 'Buy Now' on any product to go to the payment page. It's quick and secure!" },
  { keywords: ['paybill', 'till', 'number', 'send money'], answer: "📱 Our M-Pesa PayBill and Till numbers are shown at the checkout page. Click 'Buy Now' on any product to proceed and see the details!" },
  { keywords: ['invoice', 'receipt', 'proof of payment'], answer: "🧾 We provide receipts for all purchases. Contact us on 📞 0705387545 for any invoice requests!" },
  { keywords: ['instalment', 'installment', 'pay later', 'credit'], answer: "💳 We currently accept full payment. For large orders, contact us on 📞 0705387545 to discuss flexible payment arrangements!" },

  // DELIVERY
  { keywords: ['delivery', 'shipping', 'deliver', 'send', 'courier', 'dispatch'], answer: "🚚 Yes! We deliver nationwide across Kenya. Nairobi: same day or next day. Upcountry: 2-3 business days. Call 📞 0705387545 for delivery cost to your area!" },
  { keywords: ['nakuru', 'cbd', 'westlands', 'milimani', 'section58', 'langalanga', 'kasarani', 'pipeline'], answer: "📍 We deliver within Nakuru same day or next day. You can also visit our shop. Contact us on 📞 0705387545 for your exact area!" },
  { keywords: ['upcountry', 'mombasa', 'kisumu', 'eldoret', 'outside nairobi', 'nyeri', 'thika'], answer: "🚚 We deliver upcountry via courier. Delivery takes 2-3 business days. Extra charges may apply. Call 📞 0705387545 for a delivery quote!" },
  { keywords: ['free delivery', 'free shipping', 'delivery fee', 'shipping cost'], answer: "🚚 Delivery fees depend on your location. Nairobi deliveries start from Ksh 200. Call 📞 0705387545 for exact charges to your area!" },
  { keywords: ['how long', 'when will', 'duration', 'days to deliver', 'waiting'], answer: "⏰ Nairobi: same day or next day. Upcountry: 2-3 business days. We'll notify you once your order is dispatched!" },
  { keywords: ['track', 'tracking', 'order status', 'where is my order'], answer: "📦 To track your order, contact us on 📞 0705387545 or WhatsApp and give us your order details. We'll update you immediately!" },

  // RETURNS & WARRANTY
  { keywords: ['return', 'refund', 'exchange', 'wrong part', 'damaged'], answer: "🔄 Easy return policy! If you receive a wrong or damaged part, contact us within 7 days on 📞 0705387545 and we'll sort it out quickly!" },
  { keywords: ['warranty', 'guarantee', 'genuine', 'original', 'fake', 'counterfeit'], answer: "✅ All our parts are 100% genuine and come with a warranty. We do not sell counterfeit parts. Quality is our priority!" },
  { keywords: ['quality', 'brand', 'trusted', 'reliable', 'best'], answer: "⭐ We only stock high-quality, genuine spare parts from trusted manufacturers. Your safety on the road is our top priority!" },

  // CONTACT & LOCATION
  { keywords: ['contact', 'call', 'phone', 'number', 'reach', 'whatsapp'], answer: "📞 Call or WhatsApp us on 0705387545. Available Monday–Saturday 8am–6pm. Email: wilmarkkorir@gmail.com" },
  { keywords: ['location', 'address', 'where', 'shop', 'find you', 'directions', 'map'], answer: "📍 We are located in Nakuru, Kenya. Click the 'Location' page on our website for the exact address and Google Maps directions!" },
  { keywords: ['open', 'working hours', 'hours', 'when open', 'close', 'closed', 'sunday'], answer: "🕗 Open Monday–Saturday: 8:00am – 6:00pm. Sunday: 10:00am – 4:00pm. Public holidays may vary!" },
  { keywords: ['email', 'mail', 'write to'], answer: "📧 You can email us at wilmarkkorir@gmail.com. We respond within 24 hours on business days!" },

  // ACCOUNT
  { keywords: ['sign up', 'signup', 'register', 'create account', 'new account'], answer: "📝 Creating an account is easy! Click 'Sign Up' in the navigation bar, fill in your details, and you're ready to shop!" },
  { keywords: ['sign in', 'signin', 'login', 'log in', 'password', 'forgot password'], answer: "🔐 Click 'Sign In' in the navigation bar to access your account. Forgot your password? Contact us on 📞 0705387545 and we'll help reset it!" },

  // SELL
  { keywords: ['sell', 'add product', 'list product', 'upload product', 'vendor', 'supplier', 'i want to sell'], answer: "🛠️ Want to sell your spare parts with us? Click 'Add Product' in the navigation bar to list your products and reach thousands of buyers!" },

  // GENERAL
  { keywords: ['thank', 'thanks', 'asante', 'sawa', 'okay', 'ok', 'great', 'good', 'perfect', 'awesome'], answer: "😊 You're welcome! Feel free to ask if you need anything else. Happy shopping at FitSpare Motors!" },
  { keywords: ['bye', 'goodbye', 'see you', 'later', 'kwaheri', 'ciao'], answer: "👋 Goodbye! Thank you for visiting FitSpare Motors. Come back anytime — we're always here to help!" },
  { keywords: ['help', 'assist', 'support', 'problem', 'issue', 'not working'], answer: "🙋 I'm here to help! Tell me what you need — a specific part, payment help, delivery info, or anything else!" },
  { keywords: ['about', 'who are you', 'fitspare', 'company', 'business', 'about us'], answer: "🏢 FitSpare Motors is a trusted car spare parts shop in Kenya. We offer genuine, affordable parts with fast delivery. Our mission is to keep your car running perfectly!" },
  { keywords: ['car not starting', 'wont start', "won't start", 'dead car'], answer: "🔧 A car that won't start could be a dead battery, bad starter motor, or fuel issue. We stock all these parts! Search above or call 📞 0705387545 for expert advice!" },
  { keywords: ['noise', 'sound', 'knocking', 'squeaking', 'grinding'], answer: "🔊 Strange car noises can mean worn brake pads, suspension issues, or engine problems. We can help! Call 📞 0705387545 to describe the issue and we'll recommend the right part!" },
  { keywords: ['smoke', 'burning', 'overheating', 'temperature'], answer: "🌡️ If your car is smoking or overheating, check your coolant, radiator, or thermostat. We stock all these parts. Act fast — overheating can damage your engine!" },
  { keywords: ['service', 'service kit', 'maintenance', 'full service'], answer: "🔧 We sell service kits including oil filter, air filter, spark plugs, and engine oil. Perfect for a full car service. Search 'service kit' above!" },
];

// ── CAR BRANDS ──
const carBrands = [
  { name: 'BMW', flag: '🇩🇪' }, { name: 'Mercedes-Benz', flag: '🇩🇪' }, { name: 'Audi', flag: '🇩🇪' },
  { name: 'Volkswagen', flag: '🇩🇪' }, { name: 'Porsche', flag: '🇩🇪' }, { name: 'Toyota', flag: '🇯🇵' },
  { name: 'Nissan', flag: '🇯🇵' }, { name: 'Honda', flag: '🇯🇵' }, { name: 'Subaru', flag: '🇯🇵' },
  { name: 'Mazda', flag: '🇯🇵' }, { name: 'Mitsubishi', flag: '🇯🇵' }, { name: 'Suzuki', flag: '🇯🇵' },
  { name: 'Isuzu', flag: '🇯🇵' }, { name: 'Lexus', flag: '🇯🇵' }, { name: 'Infiniti', flag: '🇯🇵' },
  { name: 'Ford', flag: '🇺🇸' }, { name: 'Chevrolet', flag: '🇺🇸' }, { name: 'Jeep', flag: '🇺🇸' },
  { name: 'Dodge', flag: '🇺🇸' }, { name: 'Land Rover', flag: '🇬🇧' }, { name: 'Jaguar', flag: '🇬🇧' },
  { name: 'Volvo', flag: '🇸🇪' }, { name: 'Peugeot', flag: '🇫🇷' }, { name: 'Renault', flag: '🇫🇷' },
  { name: 'Hyundai', flag: '🇰🇷' }, { name: 'Kia', flag: '🇰🇷' }, { name: 'Opel', flag: '🇩🇪' },
  { name: 'Fiat', flag: '🇮🇹' }, { name: 'Alfa Romeo', flag: '🇮🇹' }, { name: 'Ferrari', flag: '🇮🇹' },
];

const quickQuestions = [
  "Do you have brake pads?",
  "How do I pay?",
  "Do you deliver?",
  "Working hours?",
  "Return policy?",
  "Toyota parts?",
];

const INITIAL_CHAT = [
  { role: 'assistant', text: "Hi! 👋 Welcome to FitSpare Motors! Ask me about car parts, prices, delivery, payment, or anything else. I'm here to help!" }
];

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerComment, setFooterComment] = useState("");
  const [footerSent, setFooterSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const chatBottomRef = useRef(null);
  const navigate = useNavigate();
  const IMG_URL = "https://cyberspecter.alwaysdata.net/static/images/";

  // ── AUTH ──
  const requireAuth = (callback) => {
    const user = localStorage.getItem("user");
    if (!user) { navigate("/signup"); return false; }
    if (callback) callback();
    return true;
  };

  const handleNav = (path, state = {}) => {
    const user = localStorage.getItem("user");
    const publicPaths = ['/', '/signup', '/signin', '/aboutus', '/location'];
    if (!user && !publicPaths.includes(path)) { navigate("/signup"); return; }
    navigate(path, state);
  };

  // ── DATA ──
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading("Loading products, please wait...");
      setError("");
      try {
        const { data } = await axios.get("https://cyberspecter.alwaysdata.net/api/get_product_details");
        setProducts(data);
      } catch (err) {
        setError("Failed to load products: " + err.message);
      } finally {
        setLoading("");
      }
    };
    fetchProducts();
  }, []);

  // ── SCROLL CHAT TO BOTTOM ──
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  // ── SEARCH ──
  const filteredProducts = products.filter(p =>
    p.product_name?.toLowerCase().includes(search.toLowerCase()) ||
    p.product_description?.toLowerCase().includes(search.toLowerCase())
  );

  const highlight = (text) => {
    if (!search || !text) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return String(text).split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  // ── CART ──
  const addToCart = (product) => {
    if (!requireAuth()) return;
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });
    showToast(`🛒 "${product.product_name}" added to cart!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, delta) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const cartTotal = cart.reduce((sum, i) => sum + i.product_cost * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // ── TOAST ──
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── CHAT ──
  const getReply = (text) => {
    const lower = text.toLowerCase();
    const match = chatAnswers.find(item => item.keywords.some(kw => lower.includes(kw)));
    return match?.answer ?? "I'm not sure about that 🤔 Please call us on 📞 0705387545 or WhatsApp for more help. We're happy to assist!";
  };

  const dispatchChat = (userText) => {
    if (!requireAuth()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatLoading(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'assistant', text: getReply(userText) }]);
      setChatLoading(false);
    }, 800);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim() || chatLoading) return;
    dispatchChat(chatInput);
    setChatInput('');
  };

  // ── FOOTER FORM ──
  const handleFooterSubmit = () => {
    if (!footerEmail || !footerComment) return;
    setFooterSent(true);
    setTimeout(() => {
      setFooterSent(false);
      setFooterEmail('');
      setFooterComment('');
    }, 3500);
  };

  const marqueeItems = [...carBrands, ...carBrands];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: '#1a1a2e', color: '#fff', padding: '14px 22px',
          borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          fontWeight: 600, fontSize: '0.95rem', animation: 'slideInRight 0.4s ease',
          borderLeft: '4px solid #ff7e5f'
        }}>
          {toast}
        </div>
      )}

      {/* CART DRAWER */}
      <div style={{
        position: 'fixed', top: 0, right: cartOpen ? 0 : '-420px',
        width: 400, height: '100vh', background: '#fff',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.25)', zIndex: 9000,
        transition: 'right 0.4s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>
        <div style={{ background: 'linear-gradient(90deg,#ff7e5f,#feb47b)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ margin: 0, color: '#fff', fontWeight: 700 }}>🛒 Your Cart ({cartCount})</h5>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 60, color: '#999' }}>
              <div style={{ fontSize: 60 }}>🛒</div>
              <p style={{ marginTop: 12, fontWeight: 600 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Add some products to get started!</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 16, padding: 12, borderRadius: 12, background: '#fff8f6', border: '1px solid #ffe0d6' }}>
              <img src={IMG_URL + item.product_photo} alt={item.product_name} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 10 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{item.product_name}</p>
                <p style={{ margin: '2px 0 8px', color: '#ff4500', fontWeight: 700 }}>Ksh {item.product_cost}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #ff7e5f', background: '#fff', color: '#ff7e5f', fontWeight: 700, cursor: 'pointer' }}>−</button>
                  <span style={{ fontWeight: 700 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: '#ff7e5f', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p style={{ margin: 0, fontWeight: 700, color: '#333' }}>Ksh {(item.product_cost * item.qty).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 18 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #f0e0dd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: 14 }}>
              <span>Total</span>
              <span style={{ color: '#ff4500' }}>Ksh {cartTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={() => { setCartOpen(false); handleNav('/makepayment', { state: { cart } }); }}
              style={{ width: '100%', padding: 14, background: 'linear-gradient(90deg,#ff7e5f,#feb47b)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
            >
              Proceed to Checkout →
            </button>
            <button onClick={() => setCart([])} style={{ width: '100%', marginTop: 8, padding: 10, background: 'none', border: '1.5px solid #ddd', borderRadius: 12, color: '#999', fontWeight: 600, cursor: 'pointer' }}>
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {cartOpen && <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 8999 }} />}

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md offer-navbar sticky-top">
        <div className="container">
          <img src="/images2/logo 1.jpeg" alt="FitSpare Logo" className="navbar-logo me-2" />
          <Link to="/" className="navbar-brand fw-bold text-light">FitSpare Motors</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto align-items-center">
              <Link to="/" className="nav-link active">Home</Link>
              <Link to="/addproduct" className="nav-link">Add Product</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/aboutus" className="nav-link offer-link">About Us</Link>
              <Link to="/location" className="nav-link offer-link">Location</Link>
              <button
                onClick={() => { if (requireAuth()) setCartOpen(true); }}
                style={{ marginLeft: 12, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 30, color: '#fff', padding: '6px 16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(6px)' }}
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span style={{ background: '#ff4500', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OFFER BANNER */}
      <div className="offer-words d-flex justify-content-center align-items-center">
        <div className="fade-text-wrapper">
          <span className="fade-text">🔥 Best Deals on Car Parts! 🔥</span>
          <span className="fade-text">💥 Flash Sale — Don't Miss Out! 💥</span>
          <span className="fade-text">🚗 Genuine & Affordable Parts! 🚗</span>
          <span className="fade-text">⚡ Fast Delivery & Trusted Quality! ⚡</span>
        </div>
      </div>

      <style>{`
        .offer-navbar { background: linear-gradient(90deg,#ff7e5f,#feb47b); box-shadow: 0 4px 15px rgba(0,0,0,0.25); padding: 0.8rem 1rem; }
        .offer-navbar .navbar-brand { font-size: 1.5rem; letter-spacing: 1px; transition: transform 0.3s; }
        .offer-navbar .navbar-brand:hover { transform: scale(1.1); color: #fff8dc; }
        .offer-navbar .nav-link { color: white; margin-left: 0.5rem; font-weight: 500; position: relative; transition: all 0.3s; }
        .offer-navbar .nav-link::after { content: ''; position: absolute; width: 0%; height: 2px; bottom: -3px; left: 0; background-color: #fff; transition: width 0.3s; }
        .offer-navbar .nav-link:hover::after { width: 100%; }
        .offer-navbar .nav-link.active { font-weight: 700; color: #ffe066; }
        .navbar-logo { height: 45px; width: 45px; border-radius: 50%; border: 2px solid #fff; transition: transform 0.3s ease; }
        .navbar-logo:hover { transform: rotate(15deg) scale(1.1); }

        .offer-words { background: linear-gradient(135deg,#1a1a2e,#16213e); height: 80px; overflow: hidden; }
        .fade-text-wrapper { position: relative; width: 100%; text-align: center; display: flex; justify-content: center; align-items: center; height: 100%; }
        .fade-text { position: absolute; opacity: 0; font-size: 1.4rem; font-weight: 800; color: #feb47b; text-shadow: 0 0 20px rgba(255,180,123,0.5); animation: fadeInOut 8s infinite; letter-spacing: 1px; }
        .fade-text:nth-child(1) { animation-delay: 0s; }
        .fade-text:nth-child(2) { animation-delay: 2s; }
        .fade-text:nth-child(3) { animation-delay: 4s; }
        .fade-text:nth-child(4) { animation-delay: 6s; }
        @keyframes fadeInOut { 0%,20%{opacity:0;transform:translateY(20px)} 25%,50%{opacity:1;transform:translateY(0)} 55%,100%{opacity:0;transform:translateY(-20px)} }
        @keyframes slideInRight { from{transform:translateX(80px);opacity:0} to{transform:translateX(0);opacity:1} }

        .carousel-img { height: 520px; object-fit: cover; }
        .colourful-caption { background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); border-radius: 16px; padding: 20px 28px; }
        .colourful-caption h1 { font-weight: 800; letter-spacing: 0.5px; }
        .features { font-size: 0.95rem; color: #ffe066; letter-spacing: 0.5px; }
        .carousel-btn-group { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
        .carousel-btn-group .btn { min-width: 120px; }

        .search-section { background: linear-gradient(135deg,#fff8f5,#fff3e0); padding: 28px 20px; border-bottom: 1px solid #ffe0d6; }
        .search-wrap { max-width: 640px; margin: 0 auto; display: flex; align-items: center; background: #fff; border-radius: 50px; box-shadow: 0 6px 30px rgba(255,126,95,0.18); border: 2px solid #ffe0d6; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; }
        .search-wrap:focus-within { border-color: #ff7e5f; box-shadow: 0 8px 36px rgba(255,126,95,0.28); }
        .search-icon { padding: 0 16px; font-size: 1.2rem; color: #ff7e5f; flex-shrink: 0; }
        .search-input { flex: 1; border: none; outline: none; padding: 14px 4px; font-size: 1rem; font-weight: 500; color: #1a1a2e; background: transparent; }
        .search-input::placeholder { color: #bbb; font-weight: 400; }
        .search-clear { background: none; border: none; color: #ccc; font-size: 1.1rem; cursor: pointer; padding: 0 10px; transition: color 0.2s; flex-shrink: 0; }
        .search-clear:hover { color: #ff4500; }
        .search-btn { background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; color: #fff; font-weight: 800; padding: 14px 28px; font-size: 0.95rem; cursor: pointer; flex-shrink: 0; transition: opacity 0.2s; }
        .search-btn:hover { opacity: 0.88; }
        .search-meta { text-align: center; margin-top: 12px; font-size: 0.85rem; color: #aaa; font-weight: 500; }
        .search-meta b { color: #ff7e5f; }
        .tag-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .tag { background: #fff; border: 1.5px solid #ffe0d6; border-radius: 30px; padding: 5px 14px; font-size: 0.8rem; font-weight: 600; color: #ff7e5f; cursor: pointer; transition: all 0.2s; }
        .tag:hover { background: #ff7e5f; color: #fff; border-color: #ff7e5f; }

        .no-results { text-align: center; padding: 60px 20px; }
        .no-results-icon { font-size: 64px; }
        .no-results h4 { color: #1a1a2e; font-weight: 800; margin: 16px 0 8px; }
        .no-results p { color: #999; font-size: 0.9rem; }
        .no-results-btn { margin-top: 16px; background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; border-radius: 30px; color: #fff; font-weight: 700; padding: 11px 28px; cursor: pointer; font-size: 0.95rem; }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(270px,1fr)); gap: 28px; padding: 0 20px 40px; }
        .product-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: transform 0.35s ease, box-shadow 0.35s ease; display: flex; flex-direction: column; animation: fadeInUp 0.7s both; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(255,126,95,0.2); }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        .img-wrap { position: relative; overflow: hidden; height: 210px; background: #f7f7f7; }
        .img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .product-card:hover .img-wrap img { transform: scale(1.07); }
        .img-overlay { position: absolute; inset: 0; background: rgba(26,26,46,0.55); display: flex; justify-content: center; align-items: center; gap: 10px; opacity: 0; transition: opacity 0.35s ease; }
        .product-card:hover .img-overlay { opacity: 1; }
        .overlay-btn { padding: 9px 18px; border-radius: 30px; font-weight: 700; font-size: 0.85rem; cursor: pointer; border: none; transition: transform 0.2s, box-shadow 0.2s; }
        .overlay-btn:hover { transform: scale(1.08); box-shadow: 0 6px 18px rgba(0,0,0,0.3); }
        .badge-hot { position: absolute; top: 12px; left: 12px; background: linear-gradient(135deg,#ff4500,#ff7e5f); color: #fff; padding: 5px 11px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; z-index: 2; box-shadow: 0 4px 12px rgba(255,69,0,0.4); }
        .card-body-inner { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
        .product-name { font-weight: 800; font-size: 1rem; color: #1a1a2e; margin-bottom: 4px; line-height: 1.3; }
        .product-desc { font-size: 0.82rem; color: #888; margin-bottom: 10px; line-height: 1.5; flex: 1; }
        .price-row { display: flex; align-items: baseline; gap: 8px; margin: 10px 0 14px; flex-wrap: wrap; }
        .price { font-size: 1.3rem; font-weight: 800; color: #ff4500; }
        .btn-buy { flex: 1; padding: 11px; border-radius: 12px; border: none; background: linear-gradient(90deg,#ff7e5f,#feb47b); color: #fff; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn-buy:hover { transform: scale(1.04); box-shadow: 0 8px 24px rgba(255,126,95,0.4); }
        .btn-cart { padding: 11px 14px; border-radius: 12px; border: 2px solid #ff7e5f; background: transparent; color: #ff7e5f; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; }
        .btn-cart:hover { background: #ff7e5f; color: #fff; transform: scale(1.04); }
        .section-title { font-size: 1.9rem; font-weight: 900; color: #1a1a2e; letter-spacing: -0.5px; }
        .section-sub { color: #888; font-size: 0.95rem; margin-bottom: 30px; }
        .trust-bar { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; padding: 18px 20px; background: #fff8f5; border-top: 1px solid #ffe0d6; border-bottom: 1px solid #ffe0d6; }
        .trust-item { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 600; color: #555; }
        .trust-icon { font-size: 1.3rem; }
        mark { background: #fff3cd; border-radius: 3px; padding: 0 2px; font-weight: 700; color: #b35c00; }

        .chat-bubble-bot { background: #fff; border: 1px solid #ffe0d6; border-radius: 14px 14px 14px 4px; padding: 10px 14px; max-width: 78%; font-size: 0.85rem; color: #1a1a2e; line-height: 1.5; }
        .chat-bubble-user { background: #ff7e5f; border-radius: 14px 14px 4px 14px; padding: 10px 14px; max-width: 78%; font-size: 0.85rem; color: #fff; line-height: 1.5; }
        .chat-chip { background: #fff; border: 1.5px solid #ffe0d6; border-radius: 20px; padding: 5px 12px; font-size: 0.78rem; font-weight: 600; color: #ff7e5f; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .chat-chip:hover { background: #ff7e5f; color: #fff; border-color: #ff7e5f; }
        @keyframes chatBounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-5px);opacity:1} }
        @keyframes chatSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        .brands-marquee-section { background: linear-gradient(135deg,#0f0f1e 0%,#1a1a2e 60%,#16213e 100%); padding: 22px 0; overflow: hidden; border-top: 3px solid #ff7e5f; border-bottom: 3px solid #feb47b; position: relative; }
        .brands-marquee-section::before { content: '🚗 WE SUPPORT'; position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 0.7rem; font-weight: 900; letter-spacing: 2.5px; color: #ff7e5f; z-index: 10; background: #1a1a2e; padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(255,126,95,0.35); white-space: nowrap; }
        .brands-marquee-section::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 160px; background: linear-gradient(90deg,#1a1a2e 40%,transparent); z-index: 5; pointer-events: none; }
        .brands-marquee-fade-right { position: absolute; right: 0; top: 0; bottom: 0; width: 120px; background: linear-gradient(270deg,#1a1a2e 40%,transparent); z-index: 5; pointer-events: none; }
        .brands-marquee-track { display: flex; align-items: center; animation: marquee-scroll 45s linear infinite; width: max-content; padding-left: 180px; }
        .brands-marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .brand-pill { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,126,95,0.28); border-radius: 50px; padding: 10px 26px; margin: 0 12px; white-space: nowrap; font-size: 1.15rem; font-weight: 800; color: #e8e8f0; letter-spacing: 0.8px; transition: all 0.25s ease; cursor: default; user-select: none; }
        .brand-pill:hover { background: rgba(255,126,95,0.18); border-color: #ff7e5f; color: #feb47b; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(255,126,95,0.25); }
        .brand-pill .brand-flag { font-size: 1.35rem; line-height: 1; }
        .brand-pill .brand-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,126,95,0.4); margin-left: 6px; }

        .fitspare-footer { background: linear-gradient(160deg,#0f0f1e 0%,#1a1a2e 50%,#16213e 100%); color: #e0e0e0; font-family: 'Segoe UI', sans-serif; position: relative; overflow: hidden; }
        .fitspare-footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg,#ff7e5f,#feb47b,#ff7e5f); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
        @keyframes shimmer { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 28px; padding: 36px 60px 24px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        @media (max-width: 992px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 24px; padding: 32px 32px 24px; } }
        @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; gap: 20px; padding: 28px 24px 20px; } .footer-bottom-inner { flex-direction: column; gap: 16px; text-align: center; } }
        .footer-brand-logo { width: 44px; height: 44px; border-radius: 50%; border: 3px solid #ff7e5f; object-fit: cover; margin-bottom: 10px; box-shadow: 0 0 20px rgba(255,126,95,0.4); }
        .footer-brand-name { font-size: 1.3rem; font-weight: 900; background: linear-gradient(90deg,#ff7e5f,#feb47b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; letter-spacing: 0.5px; }
        .footer-brand-desc { font-size: 0.83rem; color: #8899aa; line-height: 1.6; margin-bottom: 16px; }
        .footer-col-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #ff7e5f; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
        .footer-col-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg,#ff7e5f22,transparent); }
        .footer-link { display: flex; align-items: center; gap: 8px; color: #8899aa; text-decoration: none; font-size: 0.85rem; padding: 4px 0; transition: color 0.2s, transform 0.2s; }
        .footer-link:hover { color: #feb47b; transform: translateX(4px); }
        .footer-link-arrow { font-size: 0.65rem; color: #ff7e5f; opacity: 0; transition: opacity 0.2s; }
        .footer-link:hover .footer-link-arrow { opacity: 1; }
        .footer-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
        .footer-contact-icon { width: 32px; height: 32px; flex-shrink: 0; background: rgba(255,126,95,0.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; border: 1px solid rgba(255,126,95,0.2); }
        .footer-contact-text { font-size: 0.83rem; color: #8899aa; line-height: 1.4; }
        .footer-contact-text strong { color: #ccd; display: block; font-size: 0.75rem; margin-bottom: 1px; }
        .footer-hours { display: flex; flex-direction: column; gap: 4px; }
        .footer-hour-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #8899aa; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .footer-hour-row:last-child { border-bottom: none; }
        .hour-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: rgba(29,185,84,0.15); color: #1db954; border: 1px solid rgba(29,185,84,0.25); }
        .hour-badge.closed { background: rgba(255,100,100,0.12); color: #ff6464; border-color: rgba(255,100,100,0.2); }
        .footer-form-group { margin-bottom: 10px; }
        .footer-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 8px 12px; color: #e0e0e0; font-size: 0.83rem; outline: none; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; resize: none; box-sizing: border-box; }
        .footer-input::placeholder { color: #556; }
        .footer-input:focus { border-color: #ff7e5f; box-shadow: 0 0 0 3px rgba(255,126,95,0.12); }
        .footer-submit-btn { width: 100%; padding: 9px; background: linear-gradient(90deg,#ff7e5f,#feb47b); border: none; border-radius: 10px; color: #fff; font-weight: 700; font-size: 0.88rem; cursor: pointer; letter-spacing: 0.3px; transition: transform 0.2s, box-shadow 0.2s; font-family: inherit; }
        .footer-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,126,95,0.4); }
        .footer-sent-msg { text-align: center; color: #1db954; font-weight: 700; font-size: 0.88rem; padding: 10px; background: rgba(29,185,84,0.1); border-radius: 10px; border: 1px solid rgba(29,185,84,0.2); }
        .footer-middle { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 16px 60px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        @media (max-width: 768px) { .footer-middle { padding: 14px 28px; } }
        .footer-trust-pill { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 30px; padding: 6px 14px; font-size: 0.78rem; color: #8899aa; font-weight: 600; }
        .footer-trust-pill span:first-child { font-size: 0.95rem; }
        .footer-bottom { padding: 12px 60px; background: rgba(0,0,0,0.25); }
        @media (max-width: 768px) { .footer-bottom { padding: 12px 28px; } }
        .footer-bottom-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-copyright { font-size: 0.8rem; color: #556; }
        .footer-copyright strong { color: #feb47b; }
        .footer-legal-links { display: flex; gap: 20px; }
        .footer-legal-link { font-size: 0.76rem; color: #556; text-decoration: none; transition: color 0.2s; }
        .footer-legal-link:hover { color: #feb47b; }
        .footer-glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.07; }
        .orb-1 { width: 400px; height: 400px; background: #ff7e5f; top: -100px; right: -50px; }
        .orb-2 { width: 300px; height: 300px; background: #feb47b; bottom: -80px; left: 10%; }
      `}</style>

      {/* CAROUSEL */}
      <section className="row">
        <div className="col-12">
          <div id="mycarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
              {[0, 1, 2, 3].map(i => (
                <button key={i} type="button" data-bs-target="#mycarousel" data-bs-slide-to={i} className={i === 0 ? 'active' : ''} />
              ))}
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" onClick={() => products.length > 0 && handleNav("/makepayment", { state: { product: products[0] } })} style={{ cursor: "pointer" }}>
                <img src="/images2/willy 90.jpeg" className="d-block w-100 carousel-img" alt="slide1" />
                <div className="carousel-caption colourful-caption">
                  <span className="badge bg-warning text-dark mb-2">🔥 Special Offer Available</span>
                  <h1>Welcome to FitSpare Motors</h1>
                  <p>Your trusted destination for genuine car spare parts.</p>
                  <p className="features">✔ Genuine Parts | ✔ Affordable Prices | ✔ Trusted Quality</p>
                  <div className="carousel-btn-group">
                    <button className="btn btn-danger" onClick={e => { e.stopPropagation(); products.length > 0 && addToCart(products[0]); }}>Add to Cart</button>
                    <button className="btn btn-warning" onClick={e => { e.stopPropagation(); products.length > 0 && handleNav("/makepayment", { state: { product: products[0] } }); }}>Shop Now</button>
                  </div>
                </div>
              </div>
              <div className="carousel-item" onClick={() => handleNav("/addproduct")} style={{ cursor: "pointer" }}>
                <img src="/images2/willy 91.jpeg" className="d-block w-100 carousel-img" alt="slide2" />
                <div className="carousel-caption colourful-caption">
                  <h1>Want to Sell Your Spare Parts?</h1>
                  <p>Add your product quickly and reach thousands of buyers.</p>
                  <p className="features">➕ Add Product | ⚙ Easy Upload | 🛠 Secure Listing</p>
                  <div className="carousel-btn-group">
                    <button className="btn btn-warning" onClick={e => { e.stopPropagation(); handleNav("/addproduct"); }}>Add Product</button>
                  </div>
                </div>
              </div>
              <div className="carousel-item" onClick={() => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>
                <img src="/images2/willy 93.jpeg" className="d-block w-100 carousel-img" alt="slide3" />
                <div className="carousel-caption colourful-caption">
                  <h1>Secure & Easy Payment</h1>
                  <p>Pay quickly and safely for the parts you need.</p>
                  <p className="features">💳 Multiple Payment Options | 🔒 Safe & Reliable</p>
                  <div className="carousel-btn-group">
                    <button className="btn btn-outline-light" onClick={e => { e.stopPropagation(); document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" }); }}>View Catalog</button>
                  </div>
                </div>
              </div>
              <div className="carousel-item" onClick={() => handleNav("/signin")} style={{ cursor: "pointer" }}>
                <img src="/images2/willy 94.jpeg" className="d-block w-100 carousel-img" alt="slide4" />
                <div className="carousel-caption colourful-caption">
                  <h1>Join FitSpare Motors</h1>
                  <p>Sign in or sign up to start buying or selling today.</p>
                  <p className="features">🔐 Sign In | 📝 Sign Up | ⭐ Trusted Community</p>
                  <div className="carousel-btn-group">
                    <button className="btn btn-outline-light" onClick={e => { e.stopPropagation(); handleNav("/signin"); }}>Sign In</button>
                    <button className="btn btn-primary" onClick={e => { e.stopPropagation(); handleNav("/signup"); }}>Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#mycarousel" data-bs-slide="prev"><span className="carousel-control-prev-icon" /></button>
            <button className="carousel-control-next" type="button" data-bs-target="#mycarousel" data-bs-slide="next"><span className="carousel-control-next-icon" /></button>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        {[
          { icon: '🔒', label: 'Secure Payments' },
          { icon: '🚚', label: 'Fast Delivery Nationwide' },
          { icon: '✅', label: '100% Genuine Parts' },
          { icon: '🔄', label: 'Easy Returns' },
          { icon: '📞', label: '24/7 Support' },
        ].map(({ icon, label }) => (
          <div key={label} className="trust-item"><span className="trust-icon">{icon}</span> {label}</div>
        ))}
      </div>

      {/* SEARCH BAR */}
      <div className="search-section">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by part name or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => requireAuth()}
            onKeyDown={e => e.key === 'Escape' && setSearch('')}
          />
          {search && <button className="search-clear" onClick={() => setSearch('')} title="Clear">✕</button>}
          <button className="search-btn">Search</button>
        </div>
        <p className="search-meta">
          {search
            ? <><b>{filteredProducts.length}</b> result{filteredProducts.length !== 1 ? 's' : ''} for "<b>{search}</b>"</>
            : <><b>{products.length}</b> products available — search to find what you need</>
          }
        </p>
        {!search && (
          <div className="tag-row">
            {['Brake Pads', 'Engine Oil', 'Air Filter', 'Spark Plug', 'Shock Absorber', 'Battery', 'Clutch', 'Radiator'].map(tag => (
              <button key={tag} className="tag" onClick={() => {
                if (!requireAuth()) return;
                setSearch(tag);
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCTS SECTION */}
      <div id="products-section" style={{ padding: '40px 30px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h3 className="section-title">
            {search ? `Results for "${search}"` : '🔥 Available Parts — Best Prices'}
          </h3>
          <p className="section-sub">
            {search
              ? `Showing ${filteredProducts.length} matching product${filteredProducts.length !== 1 ? 's' : ''}`
              : 'Genuine car spare parts at competitive prices. Contact us for more information on any product.'}
          </p>
        </div>

        {loading && <h4 className="text-info text-center mb-3">{loading}</h4>}
        {error && <h4 className="text-danger text-center mb-3">{error}</h4>}

        {!loading && search && filteredProducts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h4>No results for "{search}"</h4>
            <p>Try a different keyword — e.g. "brake", "engine", "filter", "oil"</p>
            <button className="no-results-btn" onClick={() => setSearch('')}>← Browse All Products</button>
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <div className="product-card" key={product.id || index} style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="img-wrap">
                <span className="badge-hot">✅ In Stock</span>
                <img src={IMG_URL + product.product_photo} alt={product.product_name} />
                <div className="img-overlay">
                  <button className="overlay-btn" style={{ background: '#fff', color: '#ff4500' }} onClick={() => addToCart(product)}>🛒 Add to Cart</button>
                  <button className="overlay-btn" style={{ background: 'linear-gradient(90deg,#ff7e5f,#feb47b)', color: '#fff' }} onClick={() => handleNav('/makepayment', { state: { product } })}>Buy Now</button>
                </div>
              </div>
              <div className="card-body-inner">
                <p className="product-name">{highlight(product.product_name)}</p>
                <p className="product-desc">{highlight(product.product_description)}</p>
                <div className="price-row">
                  <span className="price">Ksh {Number(product.product_cost).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-buy" onClick={() => handleNav('/makepayment', { state: { product } })}>Buy Now</button>
                  <button className="btn-cart" onClick={() => addToCart(product)} title="Add to Cart">🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING CART BUTTON */}
      {cartCount > 0 && (
        <button
          onClick={() => { if (requireAuth()) setCartOpen(true); }}
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 7000,
            background: 'linear-gradient(135deg,#ff7e5f,#feb47b)',
            border: 'none', borderRadius: 50, color: '#fff',
            padding: '14px 22px', fontWeight: 800, fontSize: '1rem',
            boxShadow: '0 8px 30px rgba(255,126,95,0.5)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            animation: 'slideInRight 0.4s ease'
          }}
        >
          🛒 Cart
          <span style={{ background: '#fff', color: '#ff4500', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 900 }}>
            {cartCount}
          </span>
        </button>
      )}

      {/* CHAT TOGGLE BUTTON */}
      <button
        onClick={() => setChatOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, left: 28, zIndex: 7000,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg,#ff7e5f,#feb47b)',
          border: 'none', color: '#fff', fontSize: 26, cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(255,126,95,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        title="Chat with us"
      >
        {chatOpen ? '✕' : '💬'}
      </button>

      {/* CHAT BOX */}
      {chatOpen && (
        <div style={{
          position: 'fixed', bottom: 96, left: 28, zIndex: 7001,
          width: 320, height: 480, borderRadius: 18,
          background: '#fff', boxShadow: '0 12px 50px rgba(0,0,0,0.22)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'chatSlideUp 0.3s ease'
        }}>
          {/* Chat Header */}
          <div style={{ background: 'linear-gradient(90deg,#ff7e5f,#feb47b)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>FitSpare Assistant</p>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(255,255,255,0.9)' }}>● Online — Replies instantly</p>
            </div>
            <button
              onClick={() => setChatMessages(INITIAL_CHAT)}
              style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 11, cursor: 'pointer', borderRadius: 10, padding: '4px 8px', fontWeight: 600 }}
            >
              Clear
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff8f5' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 7, animation: 'chatSlideUp 0.25s ease' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#ff7e5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, alignSelf: 'flex-end' }}>🤖</div>
                )}
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>{msg.text}</div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#ff7e5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🤖</div>
                <div className="chat-bubble-bot" style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '12px 14px' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff7e5f', display: 'inline-block', animation: `chatBounce 1s ${delay}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Questions */}
          <div style={{ padding: '8px 10px', background: '#fff', borderTop: '1px solid #ffe0d6', display: 'flex', gap: 6, overflowX: 'auto' }}>
            {quickQuestions.map((q, i) => (
              <button key={i} className="chat-chip" onClick={() => dispatchChat(q)}>{q}</button>
            ))}
          </div>

          {/* Chat Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #ffe0d6', display: 'flex', gap: 8, alignItems: 'center', background: '#fff' }}>
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendChatMessage()}
              placeholder="Type your message…"
              style={{ flex: 1, border: '1.5px solid #ffe0d6', borderRadius: 30, padding: '8px 14px', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit' }}
            />
            <button
              onClick={sendChatMessage}
              disabled={chatLoading}
              style={{ width: 36, height: 36, borderRadius: '50%', background: chatLoading ? '#ccc' : '#ff7e5f', border: 'none', color: '#fff', fontSize: 16, cursor: chatLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* CAR BRANDS MARQUEE */}
      <div className="brands-marquee-section">
        <div className="brands-marquee-fade-right" />
        <div className="brands-marquee-track">
          {marqueeItems.map((brand, i) => (
            <span key={i} className="brand-pill">
              <span className="brand-flag">{brand.flag}</span>
              {brand.name}
              <span className="brand-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fitspare-footer mt-auto">
        <div className="footer-glow-orb orb-1" />
        <div className="footer-glow-orb orb-2" />

        <div className="footer-top">
          {/* Brand Column */}
          <div>
            <img src="/images2/logo 1.jpeg" alt="FitSpare Logo" className="footer-brand-logo" />
            <div className="footer-brand-name">FitSpare Motors</div>
            <p className="footer-brand-desc">
              Kenya's most trusted destination for genuine, affordable car spare parts. We keep your vehicle running at its best — from the engine to the exhaust.
            </p>
            <div className="col-md-3 text-center mb-4">
              <h4>Stay Connected</h4>
              <p style={{ textAlign: 'center' }}>Follow us on social media for updates, offers, and tips!</p>
              <div className="d-flex justify-content-center gap-2">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><img src="/images2/faba.jpeg" alt="Facebook" width="40" height="40" /></a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer"><img src="/images2/wats.jpg" alt="WhatsApp" width="40" height="40" /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><img src="/images2/insta.jpeg" alt="Instagram" width="40" height="40" /></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img src="/images2/linked.jpeg" alt="LinkedIn" width="40" height="40" /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Add Product', path: '/addproduct' },
                { label: 'Sign Up', path: '/signup' },
                { label: 'Sign In', path: '/signin' },
                { label: 'About Us', path: '/aboutus' },
                { label: 'Location', path: '/location' },
              ].map(({ label, path }) => (
                <Link key={label} to={path} className="footer-link">
                  <span className="footer-link-arrow">▶</span>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            {[
              { icon: '📞', label: 'Phone / WhatsApp', value: '0705 387 545' },
              { icon: '📧', label: 'Email', value: 'wilmarkkorir@gmail.com' },
              { icon: '📍', label: 'Location', value: 'Nakuru, Kenya' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="footer-contact-item">
                <div className="footer-contact-icon">{icon}</div>
                <div className="footer-contact-text"><strong>{label}</strong>{value}</div>
              </div>
            ))}

            <div className="footer-col-title" style={{ marginTop: 14 }}>Business Hours</div>
            <div className="footer-hours">
              <div className="footer-hour-row"><span>Mon – Sat</span><span className="hour-badge">8:00am – 6:00pm</span></div>
              <div className="footer-hour-row"><span>Sunday</span><span className="hour-badge">10:00am – 4:00pm</span></div>
              <div className="footer-hour-row"><span>Public Holidays</span><span className="hour-badge closed">May vary</span></div>
            </div>
          </div>

          {/* Message Form */}
          <div>
            <div className="footer-col-title">Send a Message</div>
            {footerSent ? (
              <div className="footer-sent-msg">✅ Message sent! We'll get back to you shortly.</div>
            ) : (
              <div>
                <div className="footer-form-group">
                  <input type="email" className="footer-input" placeholder="Your email address" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} />
                </div>
                <div className="footer-form-group">
                  <textarea className="footer-input" rows="3" placeholder="Your message or inquiry…" value={footerComment} onChange={e => setFooterComment(e.target.value)} />
                </div>
                <button className="footer-submit-btn" onClick={handleFooterSubmit} type="button">Send Message ✉️</button>
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <div className="footer-col-title">Trusted Brands</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Toyota', 'Nissan', 'Subaru', 'Honda', 'Mitsubishi', 'Isuzu', 'Mazda', 'Suzuki'].map(b => (
                  <span key={b} style={{ background: 'rgba(255,126,95,0.1)', border: '1px solid rgba(255,126,95,0.2)', borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', color: '#feb47b', fontWeight: 600 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Pills */}
        <div className="footer-middle">
          {[
            { icon: '🔒', text: 'Secure Payments' },
            { icon: '✅', text: '100% Genuine Parts' },
            { icon: '🚚', text: 'Nationwide Delivery' },
            { icon: '🔄', text: '7-Day Easy Returns' },
            { icon: '⭐', text: 'Trusted by Thousands' },
          ].map(({ icon, text }) => (
            <div key={text} className="footer-trust-pill"><span>{icon}</span><span>{text}</span></div>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="footer-copyright" style={{ margin: 0 }}>
              © 2026 <strong>FitSpare Motors</strong>. All rights reserved. Developed by <strong>Wilmark Kipkirui Korir</strong>.
            </p>
            <div className="footer-legal-links">
              <a href="/" className="footer-legal-link">Privacy Policy</a>
              <a href="/" className="footer-legal-link">Terms of Service</a>
              <a href="/" className="footer-legal-link">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GetProducts;