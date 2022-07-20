import { useState } from "react";
const Item = ({ displayItem }) => {
  const [input, setInput] = useState(100);
  const changeHandler = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const data = [
    { name: "Group A", value: 200 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300, label: "FaT" },
  ];
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
              <p>QUICK SUMMARY:</p>
              <div>
                <p>Calories</p>
                <p>{displayItem.food.nutrients.ENERC_KCAL}</p>
              </div>
              <div>
                <p>Carbs</p>
                <p>{displayItem.food.nutrients.CHOCDF}</p>
              </div>
              <div>
                <p>Fat</p>
                <p>{displayItem.food.nutrients.FAT}</p>
              </div>
              <div>
                <p>Protein</p>
                <p>{displayItem.food.nutrients.PROCNT}</p>
              </div>
              <div>
                <p>Fiber</p>
                <p>{displayItem.food.nutrients.FIBTG}</p>
              </div>
              <div className="percentageChart">
                <p>CALORIES FROM</p>
                <div className="pieChart"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
