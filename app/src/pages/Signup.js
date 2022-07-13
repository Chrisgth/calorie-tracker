import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form className="signupform">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button>Submit</button>
      </form>
      <p>Already have an account?</p>
      <Link to="/log-in">Log In</Link>
    </div>
  );
};

export default Signup;
