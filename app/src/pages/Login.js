import { Link } from "react-router-dom";

const Login = () => {
	return ( <div className="login">
		<h2>login</h2>
		<form action="http://localhost:5000/api/user/log-in" method="POST">
			<label htmlFor="username">Username</label>
			<input type="text" id="username" name="username" required/>
			<label htmlFor="">Password</label>
			<input type="password" id="password" name="password" required/>
			<button>Submit</button>
		</form>
		<p>Don't have an account?</p>
		<Link to='/sign-up'>Sign Up</Link>
</div> );
}
 
export default Login;