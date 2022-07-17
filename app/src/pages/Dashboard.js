import axios from "axios";
import { useState } from "react";
import Search from "../images/loupe.png";
const Dashboard = ({ user }) => {
  const getFood = async (food) => {
    const response = await axios.get(
      "https://api.edamam.com/api/food-database/v2/parser",
      {
        params: {
          app_id: process.env.REACT_APP_APP_ID,
          app_key: process.env.REACT_APP_APP_KEY,
          ingr: food,
        },
      }
    );

    return response;
  };

  const [searchbar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const trackuser = () => {
    console.log(user);
  };
  const changeHandler = (e) => {
    const input = document.getElementById("searchbox");
    if (input.value === "") {
      setSearchBar(false);
    } else {
      setSearchQuery(e.target.value);
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
