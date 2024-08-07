import { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner';
import axios from '../axios';
const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({ mode: 'onTouched' });

  const clickHandler = (data) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/api/user/log-in`, data)
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
        <form className="loginform" onSubmit={handleSubmit((data) => clickHandler(data))}>
          <div>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'This field is required' })}
              placeholder="Username"
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
