import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../App";

function Category() {

  const { categoryName } = useParams();

  const { addToCart } = useCart();


  let categoryProducts = products;


  if (
    categoryName !== "all" &&
    categoryName !== "bestsellers" &&
    categoryName !== "deals"
  ) {

    categoryProducts = products.filter(
      (product) =>
        product.category === categoryName
    );

  }


  if (categoryName === "bestsellers") {

    categoryProducts = products.filter(
      (product) => product.bestseller
    );

  }


  if (categoryName === "deals") {

    categoryProducts = products.filter(
      (product) => product.deal
    );

  }


  const titles = {

    all: "All Products",

    electronics: "Electronics",

    fashion: "Fashion",

    home: "Home & Living",

    beauty: "Beauty",

    sports: "Sports",

    grocery: "Grocery",

    bestsellers: "Best Sellers",

    deals: "Today's Deals",

  };


  const title =
    titles[categoryName] || "Products";


  return (
    <main className="listing-page">

      <div className="listing-header">

        <div>

          <p className="eyebrow">
            SHOPORA COLLECTION
          </p>

          <h1>
            {title}
          </h1>

          <p>
            {categoryProducts.length}
            {" "}products available
          </p>

        </div>

        <Link
          to="/"
          className="back-link"
        >
          ← Back Home
        </Link>

      </div>


      {categoryProducts.length === 0 ? (

        <div className="empty">

          <h2>
            No products found
          </h2>

          <Link to="/">
            Go back home
          </Link>

        </div>

      ) : (

        <div className="product-grid">

          {categoryProducts.map(
            (product) => (

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

            )
          )}

        </div>

      )}

    </main>
  );
}

export default Category;