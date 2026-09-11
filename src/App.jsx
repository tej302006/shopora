import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "./App.css";

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    category: "electronics",
    price: 69999,
    oldPrice: 79999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 2,
    name: "Galaxy S25",
    brand: "Samsung",
    category: "electronics",
    price: 74999,
    oldPrice: 84999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    name: "Sony Wireless Headphones",
    brand: "Sony",
    category: "electronics",
    price: 8999,
    oldPrice: 12999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 4,
    name: "MacBook Air",
    brand: "Apple",
    category: "electronics",
    price: 99999,
    oldPrice: 114999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 5,
    name: "Air Max Sneakers",
    brand: "Nike",
    category: "fashion",
    price: 5999,
    oldPrice: 8999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 6,
    name: "Classic Denim Jacket",
    brand: "Levi's",
    category: "fashion",
    price: 2499,
    oldPrice: 3999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 7,
    name: "Premium Cotton T-Shirt",
    brand: "Puma",
    category: "fashion",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 8,
    name: "Women's Casual Dress",
    brand: "Zara",
    category: "fashion",
    price: 1999,
    oldPrice: 2999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 9,
    name: "Luxury Perfume",
    brand: "Chanel",
    category: "beauty",
    price: 4999,
    oldPrice: 6999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 10,
    name: "Skin Care Set",
    brand: "Nivea",
    category: "beauty",
    price: 1299,
    oldPrice: 1899,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 11,
    name: "Running Shoes",
    brand: "Adidas",
    category: "sports",
    price: 4499,
    oldPrice: 6499,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 12,
    name: "Professional Football",
    brand: "Nike",
    category: "sports",
    price: 1999,
    oldPrice: 2499,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 13,
    name: "Fresh Fruits Basket",
    brand: "FreshFarm",
    category: "grocery",
    price: 899,
    oldPrice: 1199,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 14,
    name: "Premium Coffee",
    brand: "Starbucks",
    category: "grocery",
    price: 699,
    oldPrice: 899,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
];

/* =========================================================
   HEADER
========================================================= */

function Header({ cartCount }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(
        `/search/${encodeURIComponent(search.trim())}`
      );

      setSearch("");
    }
  }

  return (
    <header className="header">

      <div className="top-header">

        {/* LOGO */}

        <Link to="/" className="logo">
          SHOP<span>ORA</span>
        </Link>

        {/* SEARCH */}

        <form
          className="search"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="submit">
            🔍
          </button>
        </form>

        {/* HEADER LINKS */}

        <div className="header-actions">

          <Link to="/account">
            Account
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart
            <span>{cartCount}</span>
          </Link>

        </div>

      </div>

      {/* NAVIGATION */}

      <nav className="navbar">

        <Link to="/">
          Home
        </Link>

        <Link to="/all">
          All
        </Link>

        <Link to="/category/electronics">
          Electronics
        </Link>

        <Link to="/category/fashion">
          Fashion
        </Link>

        <Link to="/category/beauty">
          Beauty
        </Link>

        <Link to="/category/sports">
          Sports
        </Link>

        <Link to="/category/grocery">
          Grocery
        </Link>

        <Link to="/best-sellers">
          Best Sellers
        </Link>

        <Link to="/deals">
          Today's Deals
        </Link>

      </nav>

    </header>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-image"
      >
        <img
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="product-info">

        <p className="brand">
          {product.brand}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="rating">
          ⭐ {product.rating}
        </div>

        <div className="price-row">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          <del>
            ₹{product.oldPrice.toLocaleString("en-IN")}
          </del>

        </div>

        <button
          className="add-cart"
          onClick={() =>
            addToCart(product)
          }
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({ addToCart }) {
  return (
    <>
      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            WELCOME TO SHOPORA
          </p>

          <h1>
            Everything You Love.
            <br />
            All In One Place.
          </h1>

          <p className="hero-description">
            Discover electronics, fashion,
            beauty, sports and everyday
            essentials.
          </p>

          {/* IMPORTANT SHOP NOW */}

          <Link
            to="/all"
            className="hero-button"
          >
            Shop Now →
          </Link>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="section">

        <div className="section-title">

          <div>
            <p>EXPLORE</p>
            <h2>
              Shop by Category
            </h2>
          </div>

          <Link to="/all">
            View All →
          </Link>

        </div>

        <div className="category-grid">

          <Link
            to="/category/electronics"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1000&q=80"
              alt="Electronics"
            />

            <div className="category-overlay">
              <h3>Electronics</h3>
              <span>
                Shop Now →
              </span>
            </div>
          </Link>

          <Link
            to="/category/fashion"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80"
              alt="Fashion"
            />

            <div className="category-overlay">
              <h3>Fashion</h3>
              <span>
                Shop Now →
              </span>
            </div>
          </Link>

          <Link
            to="/category/beauty"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
              alt="Beauty"
            />

            <div className="category-overlay">
              <h3>Beauty</h3>
              <span>
                Shop Now →
              </span>
            </div>
          </Link>

          <Link
            to="/category/sports"
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80"
              alt="Sports"
            />

            <div className="category-overlay">
              <h3>Sports</h3>
              <span>
                Shop Now →
              </span>
            </div>
          </Link>

        </div>

      </section>

      {/* THREE FEATURE BOXES */}

      <section className="feature-section">

        <div className="feature-card">

          <span>
            ⭐ SHOPORA PICKS
          </span>

          <h2>
            Best Sellers
          </h2>

          <p>
            Discover products loved
            by our customers.
          </p>

          <Link to="/best-sellers">
            View Best Sellers →
          </Link>

        </div>

        <div className="feature-card">

          <span>
            🔥 LIMITED OFFERS
          </span>

          <h2>
            Today's Deals
          </h2>

          <p>
            Grab amazing products
            at special prices.
          </p>

          <Link to="/deals">
            Shop Today's Deals →
          </Link>

        </div>

        <div className="feature-card">

          <span>
            🛍️ SHOPORA STORE
          </span>

          <h2>
            Shop Everything
          </h2>

          <p>
            Explore all our products
            in one place.
          </p>

          {/* IMPORTANT SHOP NOW */}

          <Link to="/all">
            Shop Now →
          </Link>

        </div>

      </section>

      {/* POPULAR PRODUCTS */}

      <section className="section">

        <div className="section-title">

          <div>
            <p>
              TRENDING NOW
            </p>

            <h2>
              Popular Products
            </h2>
          </div>

          <Link to="/all">
            View All →
          </Link>

        </div>

        <div className="products-grid">

          {products
            .slice(0, 8)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}

        </div>

      </section>

      {/* ABOUT */}

      <section className="about-banner">

        <div>

          <p>
            WHY SHOPORA?
          </p>

          <h2>
            Shopping made
            <br />
            simple.
          </h2>

          <p>
            One destination for
            everything you love.
          </p>

          <Link to="/about">
            Learn More →
          </Link>

        </div>

      </section>
    </>
  );
}

/* =========================================================
   ALL / CATEGORY PAGE

   THIS IS THE PAGE SHOP NOW OPENS
========================================================= */

function CategoryPage({ addToCart }) {
  const { category } = useParams();

  let displayedProducts = products;

  if (
    category &&
    category !== "all"
  ) {
    displayedProducts =
      products.filter(
        (product) =>
          product.category === category
      );
  }

  let title = "All Products";

  if (category && category !== "all") {
    title =
      category.charAt(0).toUpperCase() +
      category.slice(1);
  }

  return (
    <main className="listing-page">

      <div className="page-heading">

        <p>
          SHOPORA STORE
        </p>

        <h1>
          {title}
        </h1>

        <span>
          {displayedProducts.length}
          {" "}
          products available
        </span>

      </div>

      <div className="shop-layout">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <h3>
            Categories
          </h3>

          <Link to="/all">
            All Products
          </Link>

          <Link to="/category/electronics">
            Electronics
          </Link>

          <Link to="/category/fashion">
            Fashion
          </Link>

          <Link to="/category/beauty">
            Beauty
          </Link>

          <Link to="/category/sports">
            Sports
          </Link>

          <Link to="/category/grocery">
            Grocery
          </Link>

        </aside>

        {/* PRODUCTS */}

        <div className="shop-main">

          <div className="shop-top">

            <span>
              {displayedProducts.length}
              {" "}
              Results
            </span>

            <select>
              <option>
                Sort: Featured
              </option>

              <option>
                Price: Low to High
              </option>

              <option>
                Price: High to Low
              </option>
            </select>

          </div>

          <div className="products-grid">

            {displayedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              )
            )}

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   BEST SELLERS
========================================================= */

function BestSellers({ addToCart }) {
  return (
    <main className="listing-page">

      <div className="page-heading">

        <p>
          SHOPORA STORE
        </p>

        <h1>
          Best Sellers
        </h1>

        <span>
          Customer favourites
        </span>

      </div>

      <div className="products-grid">

        {products
          .slice(0, 10)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}

      </div>

    </main>
  );
}

/* =========================================================
   DEALS
========================================================= */

function Deals({ addToCart }) {
  return (
    <main className="listing-page">

      <div className="page-heading">

        <p>
          SHOPORA STORE
        </p>

        <h1>
          Today's Deals
        </h1>

        <span>
          Limited-time offers
        </span>

      </div>

      <div className="products-grid">

        {products.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          )
        )}

      </div>

    </main>
  );
}

/* =========================================================
   PRODUCT DETAILS
========================================================= */

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product =
    products.find(
      (item) =>
        item.id === Number(id)
    );

  if (!product) {
    return (
      <div className="empty-page">

        <h1>
          Product Not Found
        </h1>

        <Link
          to="/all"
          className="dark-button"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <main className="details-page">

      <div className="details-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>

      <div className="details-info">

        <p className="brand">
          {product.brand}
        </p>

        <h1>
          {product.name}
        </h1>

        <div className="details-rating">
          ⭐ {product.rating} / 5
        </div>

        <hr />

        <div className="details-price">
          ₹
          {product.price.toLocaleString(
            "en-IN"
          )}
        </div>

        <p>
          M.R.P.{" "}
          <del>
            ₹
            {product.oldPrice.toLocaleString(
              "en-IN"
            )}
          </del>
        </p>

        <p className="save">
          Save ₹
          {(
            product.oldPrice -
            product.price
          ).toLocaleString("en-IN")}
        </p>

        <div className="delivery-box">

          🚚{" "}
          <strong>
            FREE Delivery
          </strong>

          <br />

          <small>
            Fast delivery available
            across India
          </small>

        </div>

        <button
          className="add-cart details-button"
          onClick={() =>
            addToCart(product)
          }
        >
          Add to Cart
        </button>

        <Link
          to="/cart"
          className="buy-button"
        >
          Go to Cart
        </Link>

      </div>

    </main>
  );
}

/* =========================================================
   SEARCH
========================================================= */

function SearchPage({ addToCart }) {
  const { query } = useParams();

  const searchText =
    decodeURIComponent(query);

  const results =
    products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        product.brand
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        product.category
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          )
    );

  return (
    <main className="listing-page">

      <div className="page-heading">

        <p>
          SEARCH RESULTS
        </p>

        <h1>
          Results for "{searchText}"
        </h1>

        <span>
          {results.length}
          {" "}
          products found
        </span>

      </div>

      {results.length > 0 ? (

        <div className="products-grid">

          {results.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            )
          )}

        </div>

      ) : (

        <div className="empty-page">

          <h2>
            No products found
          </h2>

          <p>
            Try searching for Apple,
            Nike, Samsung or Fashion.
          </p>

          <Link
            to="/all"
            className="dark-button"
          >
            View All Products
          </Link>

        </div>

      )}

    </main>
  );
}

/* =========================================================
   CART
========================================================= */

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  function increase(id) {
    setCart(
      cart.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      )
    );
  }

  function decrease(id) {
    setCart(
      cart
        .map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  function remove(id) {
    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const delivery =
    subtotal >= 1000 || subtotal === 0
      ? 0
      : 99;

  const total =
    subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="empty-page">

        <div className="empty-icon">
          🛒
        </div>

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          Add products to your
          cart and they will
          appear here.
        </p>

        <Link
          to="/all"
          className="dark-button"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (
    <main className="cart-page">

      <h1>
        Shopping Cart
      </h1>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.map(
            (item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <p className="brand">
                    {item.brand}
                  </p>

                  <Link
                    to={`/product/${item.id}`}
                  >
                    <h3>
                      {item.name}
                    </h3>
                  </Link>

                  <strong>
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        decrease(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increase(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      remove(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            )
          )}

        </div>

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div>
            <span>
              Subtotal
            </span>

            <strong>
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div>
            <span>
              Delivery
            </span>

            <strong>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </strong>
          </div>

          <hr />

          <div className="total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <button
            className="checkout-button"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Proceed to Checkout →
          </button>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   CHECKOUT
========================================================= */

function Checkout({ cart }) {
  const [placed, setPlaced] =
    useState(false);

  if (cart.length === 0) {
    return (
      <div className="empty-page">

        <h1>
          Your Cart is Empty
        </h1>

        <Link
          to="/all"
          className="dark-button"
        >
          Shop Now
        </Link>

      </div>
    );
  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  if (placed) {
    return (
      <div className="empty-page">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for shopping
          with Shopora.
        </p>

        <Link
          to="/"
          className="dark-button"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-form">

        <h1>
          Checkout
        </h1>

        <h2>
          Delivery Address
        </h2>

        <input
          placeholder="Full Name"
        />

        <input
          placeholder="Phone Number"
        />

        <textarea
          placeholder="Complete Address"
          rows="4"
        />

        <div className="two-inputs">

          <input
            placeholder="City"
          />

          <input
            placeholder="PIN Code"
          />

        </div>

        <h2>
          Payment Method
        </h2>

        <label>
          <input
            type="radio"
            name="payment"
            defaultChecked
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            name="payment"
          />
          Credit / Debit Card
        </label>

      </div>

      <div className="cart-summary">

        <h2>
          Order Summary
        </h2>

        <div className="total">

          <span>
            Total
          </span>

          <strong>
            ₹
            {total.toLocaleString(
              "en-IN"
            )}
          </strong>

        </div>

        <button
          className="checkout-button"
          onClick={() =>
            setPlaced(true)
          }
        >
          Place Order
        </button>

      </div>

    </main>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
  return (
    <main className="simple-page">

      <p>
        ABOUT SHOPORA
      </p>

      <h1>
        Shopping made simple.
      </h1>

      <p>
        Shopora is a modern
        e-commerce platform
        bringing electronics,
        fashion, beauty,
        sports and everyday
        products together.
      </p>

      <Link
        to="/all"
        className="dark-button"
      >
        Explore Products
      </Link>

    </main>
  );
}

/* =========================================================
   ACCOUNT
========================================================= */

function Account() {
  return (
    <div className="simple-page">

      <div className="empty-icon">
        👤
      </div>

      <h1>
        My Account
      </h1>

      <p>
        Manage your Shopora
        account.
      </p>

      <Link
        to="/all"
        className="dark-button"
      >
        Continue Shopping
      </Link>

    </div>
  );
}

/* =========================================================
   ORDERS
========================================================= */

function Orders() {
  return (
    <div className="simple-page">

      <div className="empty-icon">
        📦
      </div>

      <h1>
        My Orders
      </h1>

      <p>
        Your orders will appear
        here.
      </p>

      <Link
        to="/all"
        className="dark-button"
      >
        Shop Now
      </Link>

    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">

        <div>

          <div className="footer-logo">
            SHOP<span>ORA</span>
          </div>

          <p>
            Everything you love,
            <br />
            all in one place.
          </p>

        </div>

        <div>

          <h3>
            Shop
          </h3>

          <Link to="/all">
            All Products
          </Link>

          <Link to="/category/electronics">
            Electronics
          </Link>

          <Link to="/category/fashion">
            Fashion
          </Link>

          <Link to="/category/beauty">
            Beauty
          </Link>

        </div>

        <div>

          <h3>
            Discover
          </h3>

          <Link to="/best-sellers">
            Best Sellers
          </Link>

          <Link to="/deals">
            Today's Deals
          </Link>

          <Link to="/category/sports">
            Sports
          </Link>

          <Link to="/category/grocery">
            Grocery
          </Link>

        </div>

        <div>

          <h3>
            Help
          </h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/account">
            Account
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Shopora. All rights reserved.
      </div>

    </footer>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {

  const [cart, setCart] =
    useState([]);

  function addToCart(product) {

    setCart(
      (currentCart) => {

        const existing =
          currentCart.find(
            (item) =>
              item.id ===
              product.id
          );

        if (existing) {

          return currentCart.map(
            (item) =>
              item.id ===
              product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          );

        }

        return [
          ...currentCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }
    );
  }

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <BrowserRouter>

      <Header
        cartCount={cartCount}
      />

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
            />
          }
        />

        {/* ⭐ THIS ROUTE MAKES SHOP NOW WORK */}

        <Route
          path="/all"
          element={
            <CategoryPage
              addToCart={addToCart}
            />
          }
        />

        {/* CATEGORY ROUTE */}

        <Route
          path="/category/:category"
          element={
            <CategoryPage
              addToCart={addToCart}
            />
          }
        />

        {/* BEST SELLERS */}

        <Route
          path="/best-sellers"
          element={
            <BestSellers
              addToCart={addToCart}
            />
          }
        />

        {/* TODAY'S DEALS */}

        <Route
          path="/deals"
          element={
            <Deals
              addToCart={addToCart}
            />
          }
        />

        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

        {/* SEARCH */}

        <Route
          path="/search/:query"
          element={
            <SearchPage
              addToCart={addToCart}
            />
          }
        />

        {/* CART */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
            />
          }
        />

        {/* ABOUT */}

        <Route
          path="/about"
          element={
            <About />
          }
        />

        {/* ACCOUNT */}

        <Route
          path="/account"
          element={
            <Account />
          }
        />

        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <Orders />
          }
        />

        {/* INVALID URL */}

        <Route
          path="*"
          element={
            <div className="empty-page">

              <h1>
                Page Not Found
              </h1>

              <Link
                to="/"
                className="dark-button"
              >
                Back to Home
              </Link>

            </div>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;