import { Link } from "react-router-dom";



const Signup = () => {
	return ( <div className="signup">
		<h2>signup</h2>
		<form action="http://localhost:5000/api/user/sign-up" method="POST">
			<label htmlFor="username">Username</label>
			<input type="text" id="username" name="username" required/>
			<label htmlFor="">Password</label>
			<input type="password" id="password" name="password" required/>
			<button>Submit</button>
			<p>Allready have an account?</p>
			<Link to='/log-in'>Log In</Link>
		</form>
	</div> );
}
 
export default Signup;