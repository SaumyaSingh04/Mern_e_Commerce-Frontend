import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";

function MainNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    setFilteredData, 
    products, 
    isAuthenticated, 
    logout, 
    cart, 
    user // Access user state from context
  } = useContext(AppContext);
  //console.log("cart",cart.item);
  console.log("user",user)

  const submitHandler = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleFilterClick = (filter) => {
    let filtered;
    if (filter === "No Filter") {
      filtered = products;
    } else if (isNaN(filter)) {
      filtered = products.filter(
        (product) => product.category.toLowerCase() === filter.toLowerCase()
      );
    } else {
      filtered = products.filter(
        (product) => product.price.toString() === filter
      );
    }
    setFilteredData(filtered);
  };

  // Determine whether to show the sub-bar
  const shouldShowSubBar =
    location.pathname === "/" || location.pathname.includes("/product");

  return (
    <>
      {/* Main Navigation Bar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark py-2"
        style={{
          backgroundColor: "#4B0082",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand/Logo */}
          <Link to="/" className="navbar-brand text-white mx-3">
            MERN E-Commerce
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={submitHandler}
            className="d-flex align-items-center"
            style={{ width: "30%" }}
          >
            <div className="input-group w-100">
              <span className="input-group-text bg-dark border-0 rounded-start">
                <FaSearch color="white" />
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className="form-control bg-dark text-white border-0 rounded-end"
                placeholder="Search Products..."
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                {/* Profile Section */}
                <div className="d-flex align-items-center me-3">
                  
                  <Link to="/profile" className="btn btn-primary">
                    Profile
                  </Link>
                </div>

                {/* Cart Button */}
                <Link
                  to="/cart"
                  className="btn btn-warning mx-2 position-relative"
                >
                  <FaShoppingCart className="me-1" />
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                  Cart
                </Link>

                {/* Logout Button */}
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-warning mx-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-warning mx-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sub-bar for Filters */}
      {shouldShowSubBar && (
        <div
          className="d-flex justify-content-center align-items-center py-2"
          style={{ backgroundColor: "#6A0DAD" }}
        >
          {/* Filter Buttons */}
          {[
            "No Filter",
            "Mobile",
            "Laptop",
            "Camera",
            "Headphone",
            "15999",
            "10999",
            "59999",
            "5999",
            "20999",
            "8999",
          ].map((filter) => (
            <button
              key={filter}
              className="btn btn-outline-light mx-1"
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default MainNavbar;
