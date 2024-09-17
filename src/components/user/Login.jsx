import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result?.success) {
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="container my-5 p-4"
      style={{
        width: "600px",
        border: "2px solid yellow",
        borderRadius: "10px",
      }}
    >
      <h1 className="text-center">User Login</h1>
      <form onSubmit={submitHandler} className="my-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            value={email}
            onChange={onChangeHandler}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={password}
            onChange={onChangeHandler}
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="d-grid col-6 mx-auto my-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
