import { Link } from "react-router-dom";

const Nav = () => {
	return ( 
		<div className="navbar">
			<Link to='/'>Dashboard</Link>
			<Link to='/log-in'>Log In</Link>
			<Link to='/sign-up'>Sign Up</Link>
		</div>
	 );
}
 
export default Nav;