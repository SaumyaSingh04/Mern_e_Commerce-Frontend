import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

function ShowProduct() {
  const { products, filteredData, addToCart } = useContext(AppContext); // Corrected destructuring to use filteredData

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {filteredData?.map((product) => (
          <div
            className="col-12 col-md-4 d-flex justify-content-center mb-4"
            key={product._id}
          >
            <div className="card text-bg-dark" style={{ width: "18rem" }}>
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none text-white"
              >
                <div className="d-flex justify-content-center mt-3">
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
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title mb-3">{product.title}</h5>
                </div>
              </Link>
              <div className="card-body text-center">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary">{product.price} ₹</button>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgsrc
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowProduct;
