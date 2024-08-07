import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { updatePlan } from '../services/updatePlan';
import Close from '../images/close.png';
import Food from '../images/vegetable.png';
import ImageWithFallback from './ImageWithFallback';

const Plan = ({ plan, setPlan, plans, setPlans, user }) => {
  const [title, setTitle] = useState(plan.title);
  const [calories, setCalories] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();
  const [protein, setProtein] = useState();
  const [fiber, setFiber] = useState();
  const [planEmpty, setPlanEmpty] = useState(true);

  const updateDB = () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    const timer = setTimeout(() => {
      updatePlan(plan, config);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const newPlans = [...plans];
    newPlans[newPlans.indexOf(plan)].title = title;
    setPlans(newPlans);

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    const t = setTimeout(() => {
      updatePlan(plan, config);
    }, 1000);

    return () => {
      clearTimeout(t);
    };
  }, [title]);

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
      plan.plan.breakfast.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
      });
    }
    if (plan.plan.lunch !== []) {
      plan.plan.lunch.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
      });
    }
    if (plan.plan.dinner !== []) {
      plan.plan.dinner.forEach((item) => {
        kcal += counter(item.item.food.nutrients.ENERC_KCAL, item.weight);
        carbs += counter(item.item.food.nutrients.CHOCDF, item.weight);
        fat += counter(item.item.food.nutrients.FAT, item.weight);
        protein += counter(item.item.food.nutrients.PROCNT, item.weight);
        fiber += counter(item.item.food.nutrients.FIBTG, item.weight);
      });
    }

    setCalories(Math.round(kcal * 1e2) / 1e2);
    setCarbs(Math.round(carbs * 1e2) / 1e2);
    setFat(Math.round(fat * 1e2) / 1e2);
    setProtein(Math.round(protein * 1e2) / 1e2);
    setFiber(Math.round(fiber * 1e2) / 1e2);
  };

  const data = {
    labels: ['Carbs', 'Fat', 'Protein'],
    datasets: [
      {
        label: '# of calories',
        data: [carbs, fat, protein],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const inputChangeHandler = (e, item) => {
    let newItem = item;
    let measurementUnit = newItem.item.measures.filter(
      (measurement) => measurement.label === newItem.measurement,
    );

    newItem.measurementQuantity = Number(e.target.value);
    if (newItem.measurementQuantity === 0) newItem.measurementQuantity = 1;
    newItem.weight = measurementUnit[0].weight * e.target.value;

    totalCounter();
    updateDB();
  };

  const [select, setSelect] = useState(true);

  const selectChangeHandler = (e, item) => {
    let newItem = item;
    newItem.measurement = e.target.value;

    let measurementUnit = newItem.item.measures.filter(
      (measurement) => measurement.label === newItem.measurement,
    );

    newItem.weight = measurementUnit[0].weight * newItem.measurementQuantity;

    totalCounter();
    updateDB();

    if (select === true) {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };

  const checkPlan = () => {
    for (const meal in plan.plan) {
      if (plan.plan[meal].length !== 0) {
        return setPlanEmpty(false);
      }
    }
    return setPlanEmpty(true);
  };

  const deleteHandler = (item, array) => {
    array.splice(array.indexOf(item), 1);
    checkPlan();
    totalCounter();
    updateDB();
  };

  useEffect(() => {
    totalCounter();
    checkPlan();
    setTitle(plan.title);
  }, [plan]);

  return (
    <div className="planDisplay">
      {plan && planEmpty && (
        <div className="emptyPlan">
          <p>
            Looks like this plan is empty, search for some food to add to it in the searchbar above.
          </p>
        </div>
      )}
      {plans.length === 0 && (
        <div className="emptyPlan">
          <p>No plans</p>
        </div>
      )}
      {plan && !planEmpty && (
        <div className="plan">
          <input type="text" value={title} onChange={titleHandler} maxLength="30" />
          <div className="nutrition">
            <div className="quickStats card">
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
            <div className="chart card">
              <p>CALORIES FROM</p>
              <div className="pieChart">
                <Pie height={300} width={300} data={data} />
              </div>
            </div>
          </div>
          <div className="meals">
            <div className="breakfast card">
              <h3>Breakfast</h3>
              {plan.plan.breakfast.map((meal) => (
                <div className="meal">
                  <div className="mealimgs">
                    <img
                      src={Close}
                      alt=""
                      className="deleteMeal"
                      onClick={() => deleteHandler(meal, plan.plan.breakfast)}
                    />
                    <ImageWithFallback
                      src={meal.item.food.image}
                      defaultSrc={Food}
                      alt={meal.item.food.label}
                    />
                  </div>
                  <div className="mealLabel">{meal.item.food.label}</div>
                  <div className="planMeasurements">
                    <input
                      type="number"
                      value={meal.measurementQuantity}
                      onChange={(e) => inputChangeHandler(e, meal)}
                      min="1"
                    />
                    <select
                      name="measurement"
                      id="measurement"
                      value={meal.measurement}
                      onChange={(e) => selectChangeHandler(e, meal)}
                    >
                      {meal.item.measures.map((measurement) => (
                        <option
                          value={measurement.label}
                          onClick={(e) => selectChangeHandler(e, meal)}
                          key={meal.item.measures.indexOf(measurement)}
                        >
                          {measurement.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="lunch card">
              <h3>Lunch</h3>
              {plan.plan.lunch.map((meal) => (
                <div className="meal">
                  <div className="mealimgs">
                    <img
                      src={Close}
                      alt=""
                      className="deleteMeal"
                      onClick={() => deleteHandler(meal, plan.plan.lunch)}
                    />
                    <ImageWithFallback
                      src={meal.item.food.image}
                      defaultSrc={Food}
                      alt={meal.item.food.label}
                    />
                  </div>
                  <div className="mealLabel">{meal.item.food.label}</div>
                  <div className="planMeasurements">
                    <input
                      type="number"
                      value={meal.measurementQuantity}
                      onChange={(e) => inputChangeHandler(e, meal)}
                      min="1"
                    />
                    <select
                      name="measurement"
                      id="measurement"
                      value={meal.measurement}
                      onChange={(e) => selectChangeHandler(e, meal)}
                    >
                      {meal.item.measures.map((measurement) => (
                        <option value={measurement.label}>{measurement.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="dinner card">
              <h3>Dinner</h3>
              {plan.plan.dinner.map((meal) => (
                <div className="meal">
                  <div className="mealimgs">
                    <img
                      src={Close}
                      alt=""
                      className="deleteMeal"
                      onClick={() => deleteHandler(meal, plan.plan.dinner)}
                    />
                    <ImageWithFallback
                      src={meal.item.food.image}
                      defaultSrc={Food}
                      alt={meal.item.food.label}
                    />
                  </div>
                  <div className="mealLabel">{meal.item.food.label}</div>
                  <div className="planMeasurements">
                    <input
                      type="number"
                      value={meal.measurementQuantity}
                      onChange={(e) => inputChangeHandler(e, meal)}
                      min="1"
                    />
                    <select
                      name="measurement"
                      id="measurement"
                      value={meal.measurement}
                      onChange={(e) => selectChangeHandler(e, meal)}
                    >
                      {meal.item.measures.map((measurement) => (
                        <option value={measurement.label}>{measurement.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
