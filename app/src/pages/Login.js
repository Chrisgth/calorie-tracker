import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
const axios = require('axios').default;

const Login = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = data;

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clickHandler = (e) => {
    const form = document.querySelector('.loginform');

    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    axios
      .post('https://chrisgth-calorie-tracker.fly.dev/api/user/log-in', data)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.request.status);
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="login">
      <h2>Welcome back to Caltrack!</h2>
      <h3>Please log in</h3>
      {loading && <LoadingSpinner />}
      {loading === false && (
        <form className="loginform" onSubmit={handleSubmit(clickHandler)}>
          <div>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'This field is required' })}
              placeholder="Username"
              value={username}
              onChange={onChange}
              className={`${errors.username ? 'errorborder' : ''}`}
            />
            <p>{errors.username?.message}</p>
          </div>
          <div>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'This field is required' })}
              placeholder="Password"
              value={password}
              onChange={onChange}
              className={`${errors.password ? 'errorborder' : ''}`}
            />
            <p>{errors.password?.message}</p>
          </div>
          <button>Submit</button>
          {error === 400 && <p className="error">Invalid username or password</p>}
        </form>
      )}
      <p>Don't have an account?</p>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};

export default Login;
