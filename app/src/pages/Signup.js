import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
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
    const form = document.querySelector(".signupform");

    e.preventDefault();
    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }

    console.log(data);
    axios
      .post("http://localhost:5000/api/user/sign-up", data)
      .then((response) => {
        if (response.status === 201) {
          navigate("/log-in", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <form className="signupform">
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
      <p>Already have an account?</p>
      <Link to="/log-in">Log in</Link>
    </div>
  );
};

export default Signup;
