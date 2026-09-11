import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";

function Search() {

  const [searchParams] = useSearchParams();

  const query =
    searchParams.get("q")?.toLowerCase() || "";

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  return (
    <div className="page">

      <header className="simple-header">

        <Link to="/" className="page-logo">
          SHOP<span>ORA</span>
        </Link>

        <Link to="/" className="back-link">
          ← Home
        </Link>

      </header>

      <main className="category-page">

        <div className="category-title">

          <p>SEARCH RESULTS</p>

          <h1>
            Results for "{query}"
          </h1>

          <span>
            {results.length} products found
          </span>

        </div>

        {results.length === 0 ? (

          <div className="empty">

            <h2>No products found</h2>

            <p>
              Try searching for electronics, fashion,
              headphones or shoes.
            </p>

            <Link to="/">
              ← Back to Home
            </Link>

          </div>

        ) : (

          <div className="category-products">

            {results.map((product) => (

              <Link
                to={`/product/${product.id}`}
                className="shop-product"
                key={product.id}
              >

                <div className="shop-product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="shop-product-info">

                  <small>
                    {product.category}
                  </small>

                  <h3>
                    {product.name}
                  </h3>

                  <div className="shop-rating">
                    ⭐ {product.rating}
                  </div>

                  <div className="shop-price">
                    <strong>
                      ₹{product.price.toLocaleString()}
                    </strong>
                  </div>

                  <button>
                    View Product →
                  </button>

                </div>

              </Link>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Search;