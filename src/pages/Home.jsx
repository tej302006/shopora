import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../App";

function Home() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { addToCart } = useCart();


  const handleSearch = () => {

    if (search.trim() !== "") {

      navigate(
        `/search?q=${encodeURIComponent(
          search.trim()
        )}`
      );

    }

  };


  const featuredProducts = products.slice(0, 4);


  return (
    <div>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            WELCOME TO SHOPORA
          </p>

          <h1>
            Everything you love.
            <br />
            <span>All in one place.</span>
          </h1>

          <p className="hero-text">
            Discover fashion, electronics, beauty,
            home essentials and everything you need
            for everyday life.
          </p>


          {/* SEARCH */}

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSearch();
                }

              }}
            />

            <button onClick={handleSearch}>
              🔍 Search
            </button>

          </div>


          <div className="hero-buttons">

            <Link
              to="/category/all"
              className="primary-btn"
            >
              Explore Products →
            </Link>

            <Link
              to="/category/deals"
              className="secondary-btn"
            >
              Today's Deals
            </Link>

          </div>

        </div>


        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=85"
            alt="Shopora shopping"
          />

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature">
          <span>🚚</span>

          <div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
        </div>


        <div className="feature">
          <span>🔒</span>

          <div>
            <h3>Secure Payments</h3>
            <p>Safe and secure checkout</p>
          </div>
        </div>


        <div className="feature">
          <span>↩️</span>

          <div>
            <h3>Easy Returns</h3>
            <p>Simple return experience</p>
          </div>
        </div>


        <div className="feature">
          <span>⭐</span>

          <div>
            <h3>Quality Products</h3>
            <p>Products you can trust</p>
          </div>
        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="section">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              EXPLORE
            </p>

            <h2>
              Shop by Category
            </h2>
          </div>

          <Link to="/category/all">
            View All →
          </Link>

        </div>


        <div className="category-grid">


          <Link
            to="/category/electronics"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85"
              alt="Electronics"
            />

            <div className="category-overlay">

              <div>
                <small>01</small>
                <h3>Electronics</h3>
              </div>

              <span>→</span>

            </div>

          </Link>


          <Link
            to="/category/fashion"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85"
              alt="Fashion"
            />

            <div className="category-overlay">

              <div>
                <small>02</small>
                <h3>Fashion</h3>
              </div>

              <span>→</span>

            </div>

          </Link>


          <Link
            to="/category/home"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"
              alt="Home"
            />

            <div className="category-overlay">

              <div>
                <small>03</small>
                <h3>Home & Living</h3>
              </div>

              <span>→</span>

            </div>

          </Link>


          <Link
            to="/category/beauty"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85"
              alt="Beauty"
            />

            <div className="category-overlay">

              <div>
                <small>04</small>
                <h3>Beauty</h3>
              </div>

              <span>→</span>

            </div>

          </Link>


          <Link
            to="/category/sports"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85"
              alt="Sports"
            />

            <div className="category-overlay">

              <div>
                <small>05</small>
                <h3>Sports</h3>
              </div>

              <span>→</span>

            </div>

          </Link>


          <Link
            to="/category/grocery"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85"
              alt="Grocery"
            />

            <div className="category-overlay">

              <div>
                <small>06</small>
                <h3>Grocery</h3>
              </div>

              <span>→</span>

            </div>

          </Link>

        </div>

      </section>


      {/* ================= FEATURED ================= */}

      <section className="section">

        <div className="section-heading">

          <div>

            <p className="eyebrow">
              TRENDING NOW
            </p>

            <h2>
              Featured Products
            </h2>

          </div>

          <Link to="/category/bestsellers">
            Best Sellers →
          </Link>

        </div>


        <div className="product-grid">

          {featuredProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <Link
                to={`/product/${product.id}`}
              >

                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  {product.deal && (
                    <span className="badge">
                      DEAL
                    </span>
                  )}

                </div>

              </Link>


              <div className="product-info">

                <small>
                  {product.category}
                </small>

                <Link
                  to={`/product/${product.id}`}
                >
                  <h3>
                    {product.name}
                  </h3>
                </Link>

                <div className="rating">
                  ⭐ {product.rating}
                  <span>
                    ({product.reviews})
                  </span>
                </div>

                <div className="price">

                  <strong>
                    ₹{product.price.toLocaleString()}
                  </strong>

                  <del>
                    ₹{product.oldPrice.toLocaleString()}
                  </del>

                </div>


                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  🛒 Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= PROMO ================= */}

      <section className="promo">

        <div className="promo-content">

          <p className="eyebrow">
            SHOPORA DEALS
          </p>

          <h2>
            Great products.
            <br />
            Better prices.
          </h2>

          <p>
            Discover today's best deals and
            save more on products you love.
          </p>

          <Link
            to="/category/deals"
            className="primary-btn"
          >
            Shop Today's Deals →
          </Link>

        </div>


        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
          alt="Shopping deals"
        />

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-grid">

          <div>

            <Link to="/" className="logo">
              SHOP<span>ORA</span>
            </Link>

            <p>
              Your modern destination for
              everything you love.
            </p>

          </div>


          <div>

            <h4>Shop</h4>

            <Link to="/category/electronics">
              Electronics
            </Link>

            <Link to="/category/fashion">
              Fashion
            </Link>

            <Link to="/category/home">
              Home
            </Link>

            <Link to="/category/beauty">
              Beauty
            </Link>

          </div>


          <div>

            <h4>Explore</h4>

            <Link to="/category/bestsellers">
              Best Sellers
            </Link>

            <Link to="/category/deals">
              Today's Deals
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>


          <div>

            <h4>Customer Care</h4>

            <a href="#">
              Help Center
            </a>

            <a href="#">
              Shipping
            </a>

            <a href="#">
              Returns
            </a>

            <a href="#">
              Contact Us
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          © 2026 Shopora. All rights reserved.

        </div>

      </footer>

    </div>
  );
}

export default Home;