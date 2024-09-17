import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const OrderConfirmation = () => {
  const { user } = useContext(AppContext); // Get the user from the context
  const { orderId } = useParams(); // Fetch orderId from the route parameter

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-success text-center mb-4">Order Confirmed!</h2>
            <p className="text-center text-muted mb-5">
              Thank you for your purchase! Your order has been placed successfully.
            </p>

            {/* Order Summary */}
            <div className="bg-light p-3 rounded mb-4">
              <h4 className="font-weight-bold mb-3">Order Summary</h4>
              <p>
                <strong>Order ID:</strong> {orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {new Date().toLocaleDateString()}
              </p>
             
            </div>

            {/* Shipping Information */}
            <div className="bg-light p-3 rounded mb-4">
              <h4 className="font-weight-bold mb-3">Shipping Information</h4>
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
              <Link to={`/profile`} className="btn btn-secondary">
                View Order Details
              </Link>
            </div>

            {/* Support Text */}
            <div className="mt-4 text-center">
              <p className="text-muted">
                Need help? Contact our <a href="#">support team</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
