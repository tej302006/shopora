import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { supabase } from "./lib/supabase";
import "./App.css";

/* PRODUCTS */
const products = [
  { id: 1, name: "iPhone 16", brand: "Apple", category: "electronics", price: 69999, oldPrice: 79999, rating: 4.8, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Galaxy S25", brand: "Samsung", category: "electronics", price: 74999, oldPrice: 84999, rating: 4.7, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Sony Wireless Headphones", brand: "Sony", category: "electronics", price: 8999, oldPrice: 12999, rating: 4.6, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "MacBook Air", brand: "Apple", category: "electronics", price: 99999, oldPrice: 114999, rating: 4.9, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Air Max Sneakers", brand: "Nike", category: "fashion", price: 5999, oldPrice: 8999, rating: 4.7, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Classic Denim Jacket", brand: "Levi's", category: "fashion", price: 2499, oldPrice: 3999, rating: 4.5, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Premium Cotton T-Shirt", brand: "Puma", category: "fashion", price: 999, oldPrice: 1499, rating: 4.5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Women's Casual Dress", brand: "Zara", category: "fashion", price: 1999, oldPrice: 2999, rating: 4.6, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80" },
  { id: 9, name: "Luxury Perfume", brand: "Chanel", category: "beauty", price: 4999, oldPrice: 6999, rating: 4.8, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80" },
  { id: 10, name: "Skin Care Set", brand: "Nivea", category: "beauty", price: 1299, oldPrice: 1899, rating: 4.6, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80" },
  { id: 11, name: "Running Shoes", brand: "Adidas", category: "sports", price: 4499, oldPrice: 6499, rating: 4.7, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80" },
  { id: 12, name: "Professional Football", brand: "Nike", category: "sports", price: 1999, oldPrice: 2499, rating: 4.6, image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80" },
  { id: 13, name: "Fresh Fruits Basket", brand: "FreshFarm", category: "grocery", price: 899, oldPrice: 1199, rating: 4.7, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80" },
  { id: 14, name: "Premium Coffee", brand: "Starbucks", category: "grocery", price: 699, oldPrice: 899, rating: 4.6, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
];

const money = (value) => Number(value || 0).toLocaleString("en-IN");
const deliveryFee = (subtotal) => (subtotal > 0 && subtotal < 1000 ? 99 : 0);

/* HEADER */
function Header({ cartCount }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  return (
    <header className="header">
      <div className="top-header">
        <Link to="/" className="logo">SHOP<span>ORA</span></Link>
        <form className="search" onSubmit={handleSearch}>
          <input type="text" placeholder="Search products, brands and more..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit">🔍</button>
        </form>
        <div className="header-actions">
          <Link to="/account">Account</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart" className="cart-link">🛒 Cart <span>{cartCount}</span></Link>
        </div>
      </div>
      <nav className="navbar">
        <Link to="/">Home</Link><Link to="/all">All</Link>
        <Link to="/category/electronics">Electronics</Link>
        <Link to="/category/fashion">Fashion</Link>
        <Link to="/category/beauty">Beauty</Link>
        <Link to="/category/sports">Sports</Link>
        <Link to="/category/grocery">Grocery</Link>
        <Link to="/best-sellers">Best Sellers</Link><Link to="/deals">Today's Deals</Link>
      </nav>
    </header>
  );
}

/* PRODUCT CARD */
function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name} /></Link>
      <div className="product-info">
        <p className="brand">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="rating">⭐ {product.rating}</div>
        <div className="price-row"><strong>₹{money(product.price)}</strong><del>₹{money(product.oldPrice)}</del></div>
        <button className="add-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

/* HOME */
function Home({ addToCart }) {
  const categories = [
    ["Electronics", "electronics", "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1000&q=80"],
    ["Fashion", "fashion", "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80"],
    ["Beauty", "beauty", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"],
    ["Sports", "sports", "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80"],
  ];
  return (
    <>
      <section className="hero"><div className="hero-content">
        <p className="hero-label">WELCOME TO SHOPORA</p>
        <h1>Everything You Love.<br />All In One Place.</h1>
        <p className="hero-description">Discover electronics, fashion, beauty, sports and everyday essentials.</p>
        <Link to="/all" className="hero-button">Shop Now →</Link>
      </div></section>
      <section className="section">
        <div className="section-title"><div><p>EXPLORE</p><h2>Shop by Category</h2></div><Link to="/all">View All →</Link></div>
        <div className="category-grid">{categories.map(([name, slug, image]) => (
          <Link key={slug} to={`/category/${slug}`} className="category-card">
            <img src={image} alt={name} /><div className="category-overlay"><h3>{name}</h3><span>Shop Now →</span></div>
          </Link>
        ))}</div>
      </section>
      <section className="feature-section">
        <div className="feature-card"><span>⭐ SHOPORA PICKS</span><h2>Best Sellers</h2><p>Discover products loved by our customers.</p><Link to="/best-sellers">View Best Sellers →</Link></div>
        <div className="feature-card"><span>🔥 LIMITED OFFERS</span><h2>Today's Deals</h2><p>Grab amazing products at special prices.</p><Link to="/deals">Shop Today's Deals →</Link></div>
        <div className="feature-card"><span>🛍️ SHOPORA STORE</span><h2>Shop Everything</h2><p>Explore all our products in one place.</p><Link to="/all">Shop Now →</Link></div>
      </section>
      <section className="section">
        <div className="section-title"><div><p>TRENDING NOW</p><h2>Popular Products</h2></div><Link to="/all">View All →</Link></div>
        <div className="products-grid">{products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
      </section>
      <section className="about-banner"><div><p>WHY SHOPORA?</p><h2>Shopping made<br />simple.</h2><p>One destination for everything you love.</p><Link to="/about">Learn More →</Link></div></section>
    </>
  );
}

/* PRODUCT LISTING / CATEGORY */
function CategoryPage({ addToCart }) {
  const { category } = useParams();
  const displayedProducts = !category || category === "all" ? products : products.filter((p) => p.category === category);
  const title = !category || category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1);
  const [sort, setSort] = useState("featured");
  const sortedProducts = [...displayedProducts].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.id - b.id);
  return (
    <main className="listing-page">
      <div className="page-heading"><p>SHOPORA STORE</p><h1>{title}</h1><span>{displayedProducts.length} products available</span></div>
      <div className="shop-layout">
        <aside className="sidebar"><h3>Categories</h3><Link to="/all">All Products</Link><Link to="/category/electronics">Electronics</Link><Link to="/category/fashion">Fashion</Link><Link to="/category/beauty">Beauty</Link><Link to="/category/sports">Sports</Link><Link to="/category/grocery">Grocery</Link></aside>
        <div className="shop-main"><div className="shop-top"><span>{displayedProducts.length} Results</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Sort: Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select>
        </div><div className="products-grid">{sortedProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div></div>
      </div>
    </main>
  );
}

/* BEST SELLERS */
function BestSellers({ addToCart }) {
  return <main className="listing-page"><div className="page-heading"><p>SHOPORA STORE</p><h1>Best Sellers</h1><span>Customer favourites</span></div><div className="products-grid">{products.slice(0, 10).map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div></main>;
}

/* DEALS */
function Deals({ addToCart }) {
  return <main className="listing-page"><div className="page-heading"><p>SHOPORA STORE</p><h1>Today's Deals</h1><span>Limited-time offers</span></div><div className="products-grid">{products.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div></main>;
}

/* PRODUCT DETAILS */
function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  if (!product) return <div className="empty-page"><h1>Product Not Found</h1><Link to="/all" className="dark-button">Continue Shopping</Link></div>;
  return (
    <main className="details-page">
      <div className="details-image"><img src={product.image} alt={product.name} /></div>
      <div className="details-info"><p className="brand">{product.brand}</p><h1>{product.name}</h1><div className="details-rating">⭐ {product.rating} / 5</div><hr />
        <div className="details-price">₹{money(product.price)}</div><p>M.R.P. <del>₹{money(product.oldPrice)}</del></p>
        <p className="save">Save ₹{money(product.oldPrice - product.price)}</p>
        <div className="delivery-box">🚚 <strong>FREE Delivery</strong><br /><small>Fast delivery available across India</small></div>
        <button className="add-cart details-button" onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to="/cart" className="buy-button">Go to Cart</Link>
      </div>
    </main>
  );
}

/* SEARCH */
function SearchPage({ addToCart }) {
  const { query = "" } = useParams();
  const searchText = decodeURIComponent(query);
  const results = products.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()) || p.brand.toLowerCase().includes(searchText.toLowerCase()) || p.category.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <main className="listing-page"><div className="page-heading"><p>SEARCH RESULTS</p><h1>Results for "{searchText}"</h1><span>{results.length} products found</span></div>
      {results.length ? <div className="products-grid">{results.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}</div> :
        <div className="empty-page"><h2>No products found</h2><p>Try searching for Apple, Nike, Samsung or Fashion.</p><Link to="/all" className="dark-button">View All Products</Link></div>}
    </main>
  );
}

/* CART */
function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const increase = (id) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decrease = (id) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  const remove = (id) => setCart((items) => items.filter((item) => item.id !== id));
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryFee(subtotal);
  const total = subtotal + delivery;

  if (!cart.length) return <div className="empty-page"><div className="empty-icon">🛒</div><h1>Your Cart is Empty</h1><p>Add products to your cart and they will appear here.</p><Link to="/all" className="dark-button">Start Shopping</Link></div>;

  return (
    <main className="cart-page"><h1>Shopping Cart</h1><div className="cart-layout">
      <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}>
        <img src={item.image} alt={item.name} /><div className="cart-item-info"><p className="brand">{item.brand}</p><Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link><strong>₹{money(item.price)}</strong>
          <div className="quantity"><button onClick={() => decrease(item.id)}>−</button><span>{item.quantity}</span><button onClick={() => increase(item.id)}>+</button></div>
          <button className="remove" onClick={() => remove(item.id)}>Remove</button>
        </div>
      </div>)}</div>
      <div className="cart-summary"><h2>Order Summary</h2><div><span>Subtotal</span><strong>₹{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{delivery ? `₹${delivery}` : "FREE"}</strong></div><hr /><div className="total"><span>Total</span><strong>₹{money(total)}</strong></div><button className="checkout-button" onClick={() => navigate("/checkout")}>Proceed to Checkout →</button></div>
    </div></main>
  );
}

/* CHECKOUT - creates an order in Supabase */
function Checkout({ cart, setCart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryFee(subtotal);
  const total = subtotal + delivery;

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setError("");

    if (!customerName.trim() || !customerPhone.trim() || !address.trim() || !city.trim() || !pinCode.trim()) {
      setError("Please fill in your name, phone number, address, city and PIN code.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(customerPhone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }
    if (customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      setError("Enter a valid email address or leave it blank.");
      return;
    }
    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const items = cart.map((item) => ({
        product_id: String(item.id),
        product_name: item.name,
        quantity: Number(item.quantity),
        unit_price_paise: Math.round(Number(item.price) * 100),
      }));

      const { data, error: orderError } = await supabase.rpc("create_shopora_order", {
        p_customer_name: customerName.trim(),
        p_customer_email: customerEmail.trim() || null,
        p_customer_phone: customerPhone.trim(),
        p_shipping_address: {
          address: address.trim(),
          city: city.trim(),
          pin_code: pinCode.trim(),
          country: "India",
        },
        p_items: items,
      });

      if (orderError) throw orderError;
      if (!data?.order_id || !data?.order_number) {
        throw new Error("The order response was incomplete. Please check your Supabase order table before retrying.");
      }

      setOrderNumber(data.order_number);
      setPlaced(true);
      setCart([]);
    } catch (err) {
      console.error("Shopora order error:", err);
      setError(err?.message || "We couldn't place your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (placed) {
    return <div className="empty-page"><div className="success-icon">✓</div><h1>Order Placed Successfully!</h1><p>Thank you for shopping with Shopora.</p><p><strong>Order number: {orderNumber}</strong></p><p>Payment method: Cash on Delivery</p><Link to="/" className="dark-button">Continue Shopping</Link></div>;
  }

  if (!cart.length) {
    return <div className="empty-page"><h1>Your Cart is Empty</h1><Link to="/all" className="dark-button">Shop Now</Link></div>;
  }

  return (
    <main className="checkout-page">
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <h1>Checkout</h1><h2>Delivery Address</h2>
        <input aria-label="Full Name" placeholder="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} autoComplete="name" required />
        <input aria-label="Email (optional)" type="email" placeholder="Email (optional)" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} autoComplete="email" />
        <input aria-label="Phone Number" type="tel" placeholder="10-digit Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} autoComplete="tel" maxLength={10} required />
        <textarea aria-label="Complete Address" placeholder="Complete Address" rows="4" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" required />
        <div className="two-inputs">
          <input aria-label="City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" required />
          <input aria-label="PIN Code" placeholder="PIN Code" inputMode="numeric" value={pinCode} onChange={(e) => setPinCode(e.target.value)} autoComplete="postal-code" maxLength={6} required />
        </div>
        <h2>Payment Method</h2>
        <label><input type="radio" name="payment" checked readOnly /> Cash on Delivery</label>
        <p>UPI and card payments will be available after secure payment gateway setup.</p>
        {error && <p role="alert" style={{ color: "#b42318" }}>{error}</p>}
        <button className="checkout-button" type="submit" disabled={loading}>{loading ? "Placing Order..." : "Place Order"}</button>
      </form>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        {cart.map((item) => <div key={item.id}><span>{item.name} × {item.quantity}</span><strong>₹{money(item.price * item.quantity)}</strong></div>)}
        <hr /><div><span>Subtotal</span><strong>₹{money(subtotal)}</strong></div>
        <div><span>Delivery</span><strong>{delivery ? `₹${delivery}` : "FREE"}</strong></div>
        <div className="total"><span>Total</span><strong>₹{money(total)}</strong></div>
      </div>
    </main>
  );
}

/* ABOUT */
function About() {
  return <main className="simple-page"><p>ABOUT SHOPORA</p><h1>Shopping made simple.</h1><p>Shopora is a modern e-commerce platform bringing electronics, fashion, beauty, sports and everyday products together.</p><Link to="/all" className="dark-button">Explore Products</Link></main>;
}

/* ACCOUNT */
function Account() {
  return <div className="simple-page"><div className="empty-icon">👤</div><h1>My Account</h1><p>Manage your Shopora account.</p><Link to="/all" className="dark-button">Continue Shopping</Link></div>;
}

/* ORDERS */
function Orders() {
  return <div className="simple-page"><div className="empty-icon">📦</div><h1>My Orders</h1><p>Order history will be available here in a future update.</p><Link to="/all" className="dark-button">Shop Now</Link></div>;
}

/* FOOTER */
function Footer() {
  return (
    <footer className="footer"><div className="footer-grid">
      <div><div className="footer-logo">SHOP<span>ORA</span></div><p>Everything you love,<br />all in one place.</p></div>
      <div><h3>Shop</h3><Link to="/all">All Products</Link><Link to="/category/electronics">Electronics</Link><Link to="/category/fashion">Fashion</Link><Link to="/category/beauty">Beauty</Link></div>
      <div><h3>Discover</h3><Link to="/best-sellers">Best Sellers</Link><Link to="/deals">Today's Deals</Link><Link to="/category/sports">Sports</Link><Link to="/category/grocery">Grocery</Link></div>
      <div><h3>Help</h3><Link to="/about">About Us</Link><Link to="/account">Account</Link><Link to="/orders">Orders</Link><Link to="/cart">Cart</Link></div>
    </div><div className="footer-bottom">© 2026 Shopora. All rights reserved.</div></footer>
  );
}

/* MAIN APP */
function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shopora-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  function updateCart(nextCart) {
    setCart((currentCart) => {
      const resolved = typeof nextCart === "function" ? nextCart(currentCart) : nextCart;
      try {
        localStorage.setItem("shopora-cart", JSON.stringify(resolved));
      } catch (err) {
        console.warn("Could not save cart in this browser.", err);
      }
      return resolved;
    });
  }

  function addToCart(product) {
    updateCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) return currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/all" element={<CategoryPage addToCart={addToCart} />} />
        <Route path="/category/:category" element={<CategoryPage addToCart={addToCart} />} />
        <Route path="/best-sellers" element={<BestSellers addToCart={addToCart} />} />
        <Route path="/deals" element={<Deals addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/search/:query" element={<SearchPage addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={updateCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={updateCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<div className="empty-page"><h1>Page Not Found</h1><Link to="/" className="dark-button">Back to Home</Link></div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
