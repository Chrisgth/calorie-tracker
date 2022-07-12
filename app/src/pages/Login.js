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
		<h2>login</h2>
		<form action="http://localhost:5000/api/user/log-in" method="POST">
			<label htmlFor="username">Username</label>
			<input type="text" id="username" name="username" required/>
			<label htmlFor="">Password</label>
			<input type="password" id="password" name="password" required/>
			<button onClick={clickHandler}>Submit</button>
		</form>
		<p>Don't have an account?</p>
		<Link to='/sign-up'>Sign Up</Link>
</div> );
}
 
export default Login;