import { Link } from "react-router-dom";

function About() {

  return (
    <main className="about-page">

      <section className="about-hero">

        <p className="eyebrow">
          ABOUT SHOPORA
        </p>

        <h1>
          Shopping made
          <span> simple.</span>
        </h1>

        <p>
          Shopora is a modern e-commerce platform
          designed to make discovering and shopping
          for products simple, enjoyable and convenient.
        </p>

      </section>


      <section className="about-content">

        <div>

          <p className="eyebrow">
            OUR MISSION
          </p>

          <h2>
            Everything you need.
            <br />
            One beautiful experience.
          </h2>

        </div>


        <div>

          <p>
            From electronics and fashion to beauty,
            sports and home essentials, Shopora brings
            multiple categories together in one modern
            shopping experience.
          </p>

          <p>
            This demo showcases a complete e-commerce
            interface with product discovery, search,
            categories, product details and cart
            functionality.
          </p>

        </div>

      </section>


      <section className="about-stats">

        <div>
          <strong>12+</strong>
          <span>Products</span>
        </div>

        <div>
          <strong>6+</strong>
          <span>Categories</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Shopping</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>Demo Experience</span>
        </div>

      </section>


      <div className="about-cta">

        <h2>
          Ready to explore Shopora?
        </h2>

        <Link
          to="/category/all"
          className="primary-btn"
        >
          Explore Products →
        </Link>

      </div>

    </main>
  );
}

export default About;