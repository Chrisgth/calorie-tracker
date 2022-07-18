import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Spinner";
import Search from "../images/loupe.png";
import Results from "../components/Results";
import { getFood } from "../services/getFood";
const Dashboard = ({ user }) => {
  const [searchbar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [result, setResult] = useState();
  const [typingTimeOut, setTypingTimeOut] = useState();

  useEffect(() => {
    const t = setTimeout(() => {
      searchFoods();
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (result?.data.parsed.length === 0) {
      console.log("refine your search");
    } else {
      console.log(result);
    }
  }, [result]);

  const searchFoods = async () => {
    const searchResult = await getFood(searchQuery);
    setResult(searchResult);
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
            {!result && <LoadingSpinner />}
            {result && <Results result={result} />}
          </div>
        )}
      </div>
      <div className="display"></div>
    </div>
  );
};

export default Dashboard;
