import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handleCODPayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/cod-checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
  
      if (orderResponse.data.success) {
        const orderId = orderResponse.data.orderId; // Get the orderId from the response
        clearCart();
        alert("Order placed successfully with Cash on Delivery!");
        navigate(`/orderconfirmation/${orderId}`); // Include orderId in the URL
      }
    } catch (error) {
      console.log("Error during checkout:", error);
      alert("There was an error placing your order.");
    }
  };
  

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>PinCode: {userAddress?.zipCode}</li>
                  <li>Near By: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handleCODPayment}
        >
          Proceed To Pay (Cash on Delivery)
        </button>
      </div>
    </>
  );
};

export default Checkout;
