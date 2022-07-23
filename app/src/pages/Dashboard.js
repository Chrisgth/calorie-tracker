import { useEffect, useState } from "react";
import LoadingSpinner from "../components/Spinner";
import Search from "../images/loupe.png";
import Results from "../components/Results";
import { getFood } from "../services/getFood";
import Item from "../components/Item";
import Uparrow from "../images/up-arrow.png";
import Downarrow from "../images/down-arrow.png";
import Close from "../images/close.png";
import { getPlans } from "../services/getPlans";
import Plan from "../components/Plan";
import { postNewPlan } from "../services/postNewPlan";
import { deletePlan } from "../services/deletePlan";
const Dashboard = ({ user }) => {
  const [searchbar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState();
  const [displayItem, setDisplayItem] = useState();
  const [displayType, setDisplayType] = useState("plan");
  const [hidden, setHidden] = useState(false);
  const [plans, setPlans] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const [sidebarLoading, setSidebarLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      searchFoods();
    }, 500);

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

  const searchPlans = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const plansResult = await getPlans(config);
    setPlans(plansResult.data.plans);
    setSelectedPlan(plansResult.data.plans[0]);
    console.log(plansResult);
  };

  const newPlan = async () => {
    setSidebarLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const newPlanResult = await postNewPlan(user, config);
    const newPlans = [...plans];
    newPlans.push(newPlanResult.data);
    setPlans(newPlans);
    setSidebarLoading(false);
  };

  const planDelete = async (plan) => {
    setSidebarLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    console.log(plan._id);
    const deletePlanResult = await deletePlan(plan, config);
    const newPlans = [...plans];
    newPlans.splice(plans.indexOf(plan), 1);
    setPlans(newPlans);
    setSelectedPlan(plans[0]);
    setSidebarLoading(false);
  };

  useEffect(() => {
    searchPlans();
    console.log(user);
  }, []);

  const clickHandler = (plan) => {
    console.log(plan);
    setSelectedPlan(plan);
    setDisplayType("plan");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Meal Plans</h2>
        {plans && sidebarLoading === false && (
          <button onClick={newPlan}>New plan</button>
        )}
        {plans &&
          sidebarLoading === false &&
          plans.map((plan) => (
            <div className="planListItem" key={plan._id}>
              <p onClick={() => clickHandler(plan)}>{plan.title}</p>
              <img src={Close} alt="delete" onClick={() => planDelete(plan)} />
            </div>
          ))}
        {!plans && <LoadingSpinner />}
        {sidebarLoading && <LoadingSpinner />}
      </div>
      <div className="searchbar">
        <div className="search">
          <img src={Search} alt="" />
          <input
            id="searchbox"
            type="text"
            placeholder="Search for food here..."
            onChange={changeHandler}
            value={searchQuery}
            autoComplete="off"
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
        {displayType === "item" && (
          <Item displayItem={displayItem} plans={plans} user={user} />
        )}
        {displayType === "plan" && selectedPlan && (
          <Plan
            plan={selectedPlan}
            setPlan={setSelectedPlan}
            plans={plans}
            setPlans={setPlans}
            user={user}
          />
        )}
        {displayType === "plan" && !plans && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Dashboard;
