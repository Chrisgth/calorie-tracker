import { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { updatePlan } from "../services/updatePlan";

const Item = ({ displayItem, plans, user }) => {
  const [input, setInput] = useState(1);
  const [select, setSelect] = useState(displayItem.measures[0].label);
  const [weight, setWeight] = useState();
  const [selectedPlan, setSelectedPlan] = useState(plans[0]._id);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const inputHandler = (e) => {
    setInput(e.target.value);
    console.log("input");
  };
  const selectHandler = (e) => {
    setSelect(e.target.value);
    console.log("select");
  };

  const planHandler = (e) => {
    setSelectedPlan(e.target.value);
  };

  const mealHandler = (e) => {
    setSelectedMeal(e.target.value);
  };

  useEffect(() => {
    setSelect(displayItem.measures[0].label);
    setInput(1);
    console.log("displayItem");
  }, [displayItem]);

  useEffect(() => {
    const measurement = displayItem.measures.filter(
      (item) => item.label === select
    );
    setWeight(Math.round(input * measurement[0].weight));
    console.log(weight);
  }, [select, input, displayItem, weight]);

  const counter = (number) => {
    const result = Number.parseFloat((number / 100) * weight).toFixed(2);
    if (isNaN(result)) {
      return Number(0).toFixed(2);
    } else {
      return result;
    }
  };

  const addToPlan = () => {
    console.log(displayItem);
    let newPlans = [...plans];
    let updatedPlan = newPlans.filter((plan) => plan._id === selectedPlan);
    const item = {
      item: displayItem,
      measurement: select,
      measurementQuantity: Number.parseInt(input),
      weight: weight,
    };
    if (selectedMeal === "breakfast") {
      updatedPlan[0].plan.breakfast.push(item);
    } else if (selectedMeal === "lunch") {
      updatedPlan[0].plan.lunch.push(item);
    } else if (selectedMeal === "dinner") {
      updatedPlan[0].plan.dinner.push(item);
    } else {
      console.log("invalid parameters");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    console.log(updatedPlan);

    updatePlan(updatedPlan, config);
  };
  const data = {
    labels: ["Carbs", "Fat", "Protein"],
    datasets: [
      {
        label: "# of calories",
        data: [
          counter(displayItem.food.nutrients.CHOCDF),
          counter(displayItem.food.nutrients.FAT),
          counter(displayItem.food.nutrients.PROCNT),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="itemDisplayContainer">
      {displayItem && (
        <div className="itemDisplay">
          <h2>{displayItem.food.label}</h2>
          <div className="itemPeripherals">
            <img src={displayItem.food.image} alt={displayItem.food.label} />
            <div className="measurements">
              <label htmlFor="amount">Amount:</label>
              <input type="number" value={input} onChange={inputHandler} />
              <select name="" id="" value={select} onChange={selectHandler}>
                {displayItem.measures.map((item) => (
                  <option
                    value={item.label}
                    key={displayItem.measures.indexOf(item)}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="nutrition">
            <div className="quickStats">
              <p>QUICK SUMMARY</p>
              <br />
              <div>
                <p>Calories</p>
                <p>{counter(displayItem.food.nutrients.ENERC_KCAL)}</p>
              </div>
              <br />
              <div>
                <p>Carbs</p>
                <p>{counter(displayItem.food.nutrients.CHOCDF)}g</p>
              </div>
              <div>
                <p>Fat</p>
                <p>{counter(displayItem.food.nutrients.FAT)}g</p>
              </div>
              <div>
                <p>Protein</p>
                <p>{counter(displayItem.food.nutrients.PROCNT)}g</p>
              </div>
              <br />
              <div>
                <p>Fiber</p>
                <p>{counter(displayItem.food.nutrients.FIBTG)}g</p>
              </div>
            </div>
            <div className="chart">
              <p>CALORIES FROM</p>
              <div className="pieChart">
                <Pie height={300} width={300} data={data} />
              </div>
            </div>
          </div>
          <select
            name="plan"
            id="plan"
            value={selectedPlan}
            onChange={planHandler}
          >
            {plans.map((plan) => (
              <option value={plan._id}>{plan.title}</option>
            ))}
          </select>
          <select
            name="meal"
            id="meal"
            value={selectedMeal}
            onChange={mealHandler}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <button onClick={addToPlan}>Add to Plan</button>
        </div>
      )}
    </div>
  );
};

export default Item;
