import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

function SearchProduct() {
  const { products } = useContext(AppContext);
  const [searchProducts, setSearchProducts] = useState([]);

  const { term } = useParams();

  useEffect(() => {
    setSearchProducts(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [products, term]);

  return (
    <div className="container text-center mt-5">
      <h3 className="mb-4">Search Products</h3>
      <div className="row justify-content-center">
        {searchProducts.length > 0 ? (
          searchProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              key={product._id}
            >
              <div className="card text-bg-dark" style={{ width: "16rem" }}>
                <Link
                  to={`/product/${product._id}`}
                  className="text-decoration-none text-white"
                >
                  <img
                    src={product.imgsrc}
                    className="card-img-top"
                    alt={product.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "2px solid yellow",
                      borderRadius: "10px",
                      margin: "auto",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                  </div>
                </Link>
                <div className="card-body text-center">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">{product.price} ₹</button>
                    <button className="btn btn-secondary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for the search term.</p>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
