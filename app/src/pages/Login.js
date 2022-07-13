import { useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Login = ({ setUser }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clickHandler = (e) => {
    const form = document.querySelector(".loginform");

    e.preventDefault();
    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }

    axios
      .post("http://localhost:5000/api/user/log-in", data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h2>Welcome back to Caltrack!</h2>
      <h3>Please log in</h3>
      <form className="loginform">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button onClick={clickHandler}>Submit</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Login;
