import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SearchPage from "./pages/SearchPage";
import BestSellers from "./pages/BestSellers";
import Deals from "./pages/Deals";
import About from "./pages/About";
import Account from "./pages/Account";
import Orders from "./pages/Orders";

function AppRoutes({ cart, setCart, addToCart }) {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <Home addToCart={addToCart} />
        }
      />

      {/* ALL PRODUCTS
          This is where the Shop Now button goes */}
      <Route
        path="/all"
        element={
          <CategoryPage
            addToCart={addToCart}
          />
        }
      />

      {/* CATEGORY PAGES */}
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

      {/* PAGE NOT FOUND */}
      <Route
        path="*"
        element={
          <div className="empty-page">
            <h1>404</h1>

            <p>
              Page not found.
            </p>

            <a href="/">
              Back to Home
            </a>
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoutes;