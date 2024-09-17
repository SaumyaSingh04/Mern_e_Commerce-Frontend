import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

function RelatedProduct({ category }) {
  const { products ,addToCart} = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (category) {
      setRelatedProducts(
        products.filter(
          (data) =>
            data?.category &&
            data?.category?.toLowerCase() === category?.toLowerCase()
        )
      );
    }
  }, [products, category]);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Related Products</h1>
      <div className="row justify-content-center">
        {relatedProducts?.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
            key={product._id}
          >
            <div
              className="card text-bg-dark"
              style={{ width: "18rem", borderRadius: "10px", overflow: "hidden" }}
            >
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
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </Link>
              <div className="card-body">
                <div className="d-flex justify-content-around">
                  <button className="btn btn-outline-light">
                    {product.price} ₹
                  </button>
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

export default RelatedProduct;
