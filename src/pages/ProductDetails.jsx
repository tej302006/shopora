import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../App";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();


  const product = products.find(
    (item) => item.id === Number(id)
  );


  if (!product) {

    return (
      <main className="empty">

        <h1>
          Product Not Found
        </h1>

        <Link to="/">
          ← Go Home
        </Link>

      </main>
    );

  }


  const handleAddToCart = () => {

    addToCart(product);

    alert(
      `${product.name} added to cart!`
    );

  };


  return (
    <main className="details-page">

      <div className="details-image">

        <img
          src={product.image}
          alt={product.name}
        />

      </div>


      <div className="details-content">

        <p className="eyebrow">
          SHOPORA /{" "}
          {product.category.toUpperCase()}
        </p>


        <h1>
          {product.name}
        </h1>


        <div className="detail-rating">

          ⭐ {product.rating}

          <span>
            {product.reviews} customer reviews
          </span>

        </div>


        <div className="detail-price">

          ₹{product.price.toLocaleString()}

          <del>
            ₹{product.oldPrice.toLocaleString()}
          </del>

        </div>


        <p className="details-description">
          {product.description}
        </p>


        <div className="delivery-box">

          <p>🚚 Free delivery</p>

          <p>
            📦 Delivery within 2–5 days
          </p>

          <p>
            ↩️ Easy returns available
          </p>

          <p>
            🔒 Secure checkout
          </p>

        </div>


        <div className="detail-actions">

          <button
            className="primary-btn large"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>


          <Link
            to="/cart"
            className="secondary-btn large"
          >
            View Cart
          </Link>

        </div>


        <div className="product-benefits">

          <div>
            <strong>Quality</strong>
            <span>Premium products</span>
          </div>

          <div>
            <strong>Delivery</strong>
            <span>Fast shipping</span>
          </div>

          <div>
            <strong>Returns</strong>
            <span>Easy returns</span>
          </div>

        </div>

      </div>

    </main>
  );
}

export default ProductDetails;