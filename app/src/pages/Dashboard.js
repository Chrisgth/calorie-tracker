import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Spinner";
import Search from "../images/loupe.png";
import Results from "../components/Results";
import { getFood } from "../services/getFood";
import Item from "../components/Item";
import Uparrow from "../images/up-arrow.png";
import Downarrow from "../images/down-arrow.png";
import Close from "../images/close.png";
const Dashboard = ({ user }) => {
  const [searchbar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState();
  const [displayItem, setDisplayItem] = useState();
  const [displayType, setDisplayType] = useState();
  const [hidden, setHidden] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState();

  useEffect(() => {
    const t = setTimeout(() => {
      searchFoods();
    }, 1000);

    if (searchQuery === "") {
      setSearchBar(false);
    } else {
      setHidden(false);
      setResult();
      setSearchBar(true);
    }

    return () => {
      clearTimeout(t);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (result?.data.parsed.length === 0) {
      console.log("refine your search");
    } else {
      return;
    }
  }, [result]);

  const searchFoods = async () => {
    if (searchQuery === "") {
      return;
    } else {
      const searchResult = await getFood(searchQuery);
      setResult(searchResult);
    }
  };

  const changeHandler = (e) => {
    setSearchQuery(e.target.value);
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
            value={searchQuery}
          />
          <img
            src={Close}
            alt="cross"
            id="close"
            onClick={() => setSearchQuery("")}
          />
        </div>
        {searchbar && (
          <div className="dropdown">
            {!result && !hidden && <LoadingSpinner />}
            {!hidden && result && (
              <Results
                result={result}
                setDisplayType={setDisplayType}
                setDisplayItem={setDisplayItem}
                setResult={setResult}
                setSearchBar={setSearchBar}
                setSearchQuery={setSearchQuery}
              />
            )}
            <button className="searchHide">
              {!hidden && (
                <img
                  src={Uparrow}
                  alt="up arrow"
                  id="hide"
                  onClick={() => setHidden(true)}
                />
              )}
              {hidden && (
                <img
                  src={Downarrow}
                  alt="down arrow"
                  id="show"
                  onClick={() => setHidden(false)}
                ></img>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="display">
        {displayType === "item" && <Item displayItem={displayItem} />}
      </div>
    </div>
  );
};

export default Dashboard;
