import { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const Item = ({ displayItem }) => {
  const [input, setInput] = useState(1);
  const [select, setSelect] = useState(displayItem.measures[0].label);
  const [weight, setWeight] = useState();
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    setSelect(displayItem.measures[0].label);
  }, [displayItem]);

  useEffect(() => {
    const measurement = displayItem.measures.filter(
      (item) => item.label === select
    );
    setWeight(Math.round(input * measurement[0].weight));
  }, [select, input]);
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
              <p>{weight}</p>
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
