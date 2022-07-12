import { Link } from "react-router-dom";
const axios = require('axios').default

const Login = () => {
	const clickHandler = () => {
		axios.get('http://localhost:5000/api/user/profile', {mode:'cors'})
			.then((response) => {
				console.log(response)
			})
			.catch(err => console.log(err))
	}
	return ( <div className="login">
		<h2>Welcome back to Caltrack!</h2>
		<h3>Please log in</h3>
		<form className="loginform">
			<div>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" required/>
			</div>
			<div>
				<label htmlFor="">Password</label>
				<input type="password" id="password" name="password" required/>
			</div>
			<button onClick={clickHandler}>Submit</button>
		</form>
		<p>Don't have an account?</p>
		<Link to='/sign-up'>Sign Up</Link>
</div> );
}
 
export default Login;