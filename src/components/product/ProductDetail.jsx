import { useState, useEffect ,useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";


function ProductDetail() {
  const { id } = useParams();
  const url = "http://localhost:3000/api";
  const { products ,addToCart} = useContext(AppContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      {product ? (
        <div className="container mt-5">
          <div className="row">
            {/* Left side - Product Image */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={product.imgsrc}
                alt={product.title}
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border:"2px solid yellow"
                }}
                className="img-fluid"
              />
            </div>

            {/* Right side - Product Details */}
            <div className="col-md-6">
              <h1>{product.title}</h1>
              <h3>{product.category}</h3>
              <p>{product.discription}</p>
              <h1 className="text-success">{product.price} ₹</h1>
              <div className="d-flex gap-2 mt-3">
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
               <button className="btn btn-success"
                           onClick={() => navigate("/shipping")}
               >Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <RelatedProduct category={product?.category}/>
    </>
  );
}

export default ProductDetail;
