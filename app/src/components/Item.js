import { useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const Item = ({ displayItem }) => {
  const [input, setInput] = useState(1);
  const changeHandler = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const data = {
    labels: ["Carbs", "Fat", "Protein"],
    datasets: [
      {
        label: "# of calories",
        data: [18, 18, 18],
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
              <input type="number" value={input} onChange={changeHandler} />
              <select name="" id="">
                {displayItem.measures.map((item) => (
                  <option value={item.label}>{item.label}</option>
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
                <p>{displayItem.food.nutrients.ENERC_KCAL}</p>
              </div>
              <br />
              <div>
                <p>Carbs</p>
                <p>{displayItem.food.nutrients.CHOCDF}g</p>
              </div>
              <div>
                <p>Fat</p>
                <p>{displayItem.food.nutrients.FAT}g</p>
              </div>
              <div>
                <p>Protein</p>
                <p>{displayItem.food.nutrients.PROCNT}g</p>
              </div>
              <br />
              <div>
                <p>Fiber</p>
                <p>{displayItem.food.nutrients.FIBTG}g</p>
              </div>
            </div>
            <div className="chart">
              <p>CALORIES FROM</p>
              <div className="pieChart">
                <Pie height={300} width={300} data={data} />
              </div>
            </div>
          </div>
          <button>Add to Plan</button>
        </div>
      )}
    </div>
  );
};

export default Item;
