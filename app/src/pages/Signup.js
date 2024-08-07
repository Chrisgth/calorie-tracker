import axios from '../axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../components/Spinner';

const Signup = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const clickHandler = (data) => {
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/api/user/sign-up`, data)
      .then((response) => {
        if (response.status === 201) {
          navigate('/log-in', { replace: true });
        }
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.request.status);
      });
  };

  return (
    <div className="signup">
      <h2>Sign up</h2>
      {loading && <LoadingSpinner />}
      {loading === false && (
        <form className="signupform" onSubmit={handleSubmit((data) => clickHandler(data))}>
          <div>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'This field is required',
                minLength: {
                  value: 5,
                  message: 'Minimum length is 5 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Maximum length is 15 characters',
                },
              })}
              placeholder="Username"
              className={`${errors.username ? 'errorborder' : ''}`}
            />
            <p>{errors.username?.message}</p>
          </div>
          <div>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Minimum length is 8 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Maximum length is 30 characters',
                },
              })}
              placeholder="Password"
              className={`${errors.password ? 'errorborder' : ''}`}
            />
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <input
              type="password"
              id="password2"
              {...register('password2', {
                required: 'This field is required',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              placeholder="Confirm Password"
              className={`${errors.password2 ? 'errorborder' : ''}`}
            />
            <p>{errors.password2?.message}</p>
          </div>
          <button>Submit</button>
          {error === 400 && <p className="error">User already exists</p>}
        </form>
      )}
      <p>Already have an account?</p>
      <Link to="/log-in">Log in</Link>
    </div>
  );
};

export default Signup;
