import { useState } from "react";
import Search from "../images/loupe.png";

const Dashboard = ({ user }) => {
  const [searchbar, setSearchBar] = useState(false);
  const trackuser = () => {
    console.log(user);
  };
  const changeHandler = () => {
    const input = document.getElementById("searchbox");
    if (input.value === "") {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };
  return (
    <div className="dashboard">
      <div className="sidebar"></div>
      <div className="searchbar">
        <div className="search">
          <img src={Search} alt="" />
          <input
            id="searchbox"
            type="text"
            placeholder="Search for food here..."
            onChange={changeHandler}
          />
        </div>
        {searchbar && (
          <div className="dropdown">
            <p>this is the searchbar dropdown</p>
          </div>
        )}
      </div>
      <div className="display"></div>
    </div>
  );
};

export default Dashboard;
