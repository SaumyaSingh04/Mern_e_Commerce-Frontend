import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  //const url = "http://localhost:3000/api";
  const url = "https://mern-e-commerce-api-spra.onrender.com/api";

  // State management
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });

        setProducts(api.data.products);
        setFilteredData(api.data.products);
        userProfile(); // Fetch user profile data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
    userCart(); // Fetch user cart data
    getAddress();
    user_Order();
  }, [token, reload]); // Depend on both token and reload

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  // Register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // Login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // Logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Fetch user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token, // Correct header for authorization
        },
        withCredentials: true,
      });

      setUser(api.data.user); // Set user data
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const addToCart = async (productId, title, price, qty, imgsrc) => {
   // console.log("product id = ", productId);
   // console.log("image source = ", imgsrc); // Debugging log
  
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgsrc },
      {
        headers: {
          "Content-Type": "application/json", // Corrected header
          Auth: token,
        },
        withCredentials: true,
      }
    );
  
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  
  const userCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json", // Corrected header
          Auth: token,
        },
        withCredentials: true,
      });
  
      setCart(api.data.cart); // Set cart data
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };
  
  const decreaseQty = async (productId, qty) => {
    // Changed endpoint to a more meaningful name
    const api = await axios.post(`${url}/cart/--qty`, { productId, qty },
      {
        headers: {
          "Content-Type": "application/json", // Corrected header
          Auth: token,
        },
        withCredentials: true,
      }
    );
  
    setReload(!reload); // Trigger reload
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json", // Corrected header
        Auth: token,
      },
      withCredentials: true,
    });
  
    setReload(!reload); // Trigger reload
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "application/json", // Corrected header
        Auth: token,
      },
      withCredentials: true,
    });
  
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  
//  Add Shipping Address
const shippingAddress = async (
  fullName,
  address,
  city,
  state,
  country,
  zipCode,
  phoneNumber
) => {
  const api = await axios.post(
    `${url}/address/add`,
    { fullName, address, city, state, country, zipCode, phoneNumber },
    {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    }
  );
  setReload(!reload);
  // console.log("remove item from cart ",api);
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
  return api.data;
  //  setCart(api.data.cart);
  //  setUser("user cart ",api);
};

// get User latest address
const getAddress = async () => {
  const api = await axios.get(`${url}/address/get`, {
    headers: {
      "Content-Type": "Application/json",
      Auth: token,
    },
    withCredentials: true,
  });
  //  console.log("user address ", api.data.userAddress);
  setUserAddress(api.data.userAddress);
};

//get User order
const user_Order = async () => {
  const api = await axios.get(`${url}/payment/userorder`, {
    headers: {
      "Content-Type": "Application/json",
      Auth: token,
    },
    withCredentials: true,
  });
  //  console.log("user order ", api.data);
  setUserOrder(api.data)
  
};
console.log("user order = ", userOrder);


  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        user_Order,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
