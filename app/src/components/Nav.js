import { Link } from "react-router-dom";

const Nav = ({ user, setUser }) => {
  const logout = () => {
    setUser();
    localStorage.clear();
  };
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Caltrack
      </Link>
      {user && <button onClick={logout}>Log out</button>}
      {!user && (
        <div>
          <Link to="/log-in">Log In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
