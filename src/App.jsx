
//import { useContext } from "react"
//import AppContext from "./context/AppContext.jsx"
import ShowProduct from "./components/product/ShowProduct.jsx";
import ProductDetail from "./components/product/ProductDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import SearchProduct from "./components/product/SearchProduct.jsx";
import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import Register from "./components/user/Register.jsx";
import Login from "./components/user/Login.jsx";
import Cart from "./components/Cart.jsx";
import Profile from "./components/user/Profile.jsx";
import Address from "./components/Address.jsx"
import CheckoutPage from './components/CheckOut.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";


function App() {
  //const {data} = useContext(AppContext)
  return (
    <>
    <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderconfirmation/:orderId" element={<OrderConfirmation />} />
      </Routes>
    </Router>
     </>
  )
}

export default App




