const Signup = () => {
	return ( <div className="signup">
		<h2>signup</h2>
		<form action="http://localhost:5000/api/user/sign-up" method="POST">
			<label htmlFor="username">Username</label>
			<input type="text" id="username" name="username"/>
			<label htmlFor="">Password</label>
			<input type="text" id="password" name="password"/>
			<button>Submit</button>
		</form>
	</div> );
}
 
export default Signup;