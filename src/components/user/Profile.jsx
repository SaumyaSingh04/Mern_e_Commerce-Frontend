import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import AppContext from "../../context/AppContext";

const UserOrders = () => {
  const { user, url  } = useContext(AppContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/payment/user-orders/${user._id}`);
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setError("Failed to retrieve orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user, url]);

  if (loading) {
    return <p className="text-center my-5 text-info">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-danger text-center my-4">{error}</p>;
  }

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-lg">
      <h1 className="text-center text-primary mb-4">Welcome, {user?.name}</h1>
      <h3 className="text-center text-muted mb-5">Email: {user?.email}</h3>
      <h2 className="text-secondary mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center fs-4 text-warning">No orders found.</p>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order._id} className="col-lg-6 col-md-6 mb-4">
              <div className="card border-primary h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Order ID: {order._id}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Total Amount:</strong> {order.amount.toFixed(2)}
                  </p>
                  <h6 className="card-subtitle mt-3 mb-2 text-muted">Ordered Products:</h6>
                  <ul className="list-group list-group-flush">
                    {order.cartItems.map((item, index) => (
                      <li key={index} className="list-group-item">
                        {item.productName} - {item.qty} x {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted">Order placed on {new Date(order.orderDate).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
                  <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
    </div>
  );
};

export default UserOrders;
