import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
const Plan = ({ plan }) => {
  const [title, setTitle] = useState(plan.title);
  const [calories, setCalories] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();
  const [protein, setProtein] = useState();
  const [fiber, setFiber] = useState();

  const titleHandler = (e) => {
    setTitle(e.target.value);
    console.log(plan);
    totalCounter();
  };

  const counter = (number, weight) => {
    const result = Math.round((number / 100) * weight * 1e2) / 1e2;

    if (isNaN(result)) {
      return Number(0).toFixed(2);
    } else {
      return result;
    }
  };

  const totalCounter = () => {
    let kcal = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;
    let fiber = 0;

    if (plan.plan.breakfast !== []) {
      console.log("breakfast");
      plan.plan.breakfast.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
      });
    }
    if (plan.plan.lunch !== []) {
      console.log("lunch");
      plan.plan.lunch.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
      });
    }
    if (plan.plan.dinner !== []) {
      console.log("dinner");
      plan.plan.dinner.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
        console.log(item.item.food.nutrients.PROCNT);
      });
    }

    setCalories(Math.round(kcal * 1e2) / 1e2);
    setCarbs(Math.round(carbs * 1e2) / 1e2);
    setFat(Math.round(fat * 1e2) / 1e2);
    setProtein(Math.round(protein * 1e2) / 1e2);
    setFiber(Math.round(fiber * 1e2) / 1e2);
  };

  const data = {
    labels: ["Carbs", "Fat", "Protein"],
    datasets: [
      {
        label: "# of calories",
        data: [44, 44, 44],
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
    <div className="planDisplay">
      {plan && (
        <div className="plan">
          <input type="text" value={title} onChange={titleHandler} />
          <div className="nutrition">
            <div className="quickStats">
              <p>QUICK SUMMARY</p>
              <br />
              <div>
                <p>Calories</p>
                <p>{calories}</p>
              </div>
              <br />
              <div>
                <p>Carbs</p>
                <p>{carbs} g</p>
              </div>
              <div>
                <p>Fat</p>
                <p>{fat} g</p>
              </div>
              <div>
                <p>Protein</p>
                <p>{protein} g</p>
              </div>
              <br />
              <div>
                <p>Fiber</p>
                <p>{fiber} g</p>
              </div>
            </div>
            <div className="chart">
              <p>CALORIES FROM</p>
              <div className="pieChart">
                <Pie height={300} width={300} data={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
