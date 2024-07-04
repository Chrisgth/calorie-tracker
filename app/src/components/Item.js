import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { updatePlan } from '../services/updatePlan';
import Food from '../images/vegetable.png';
import ImageWithFallback from './ImageWithFallback';

const Item = ({ displayItem, plans, user, setSelectedPlan, setDisplayType }) => {
  const [input, setInput] = useState(1);
  const [select, setSelect] = useState(displayItem.measures[0].label);
  const [weight, setWeight] = useState();
  const [itemSelectedPlan, setItemSelectedPlan] = useState();
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  useEffect(() => {
    if (plans.length !== 0) {
      setItemSelectedPlan(plans[0]._id);
    }
    if (plans === []) {
      setItemSelectedPlan();
    }
  }, [plans]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const planHandler = (e) => {
    setItemSelectedPlan(e.target.value);
  };

  const mealHandler = (e) => {
    setSelectedMeal(e.target.value);
  };

  useEffect(() => {
    setSelect(displayItem.measures[0].label);
    setInput(1);
  }, [displayItem]);

  useEffect(() => {
    const measurement = displayItem.measures.filter((item) => item.label === select);
    setWeight(Math.round(input * measurement[0].weight));
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
    let newPlans = [...plans];
    let updatedPlan = newPlans.filter((plan) => plan._id === itemSelectedPlan);
    const item = {
      item: displayItem,
      measurement: select,
      measurementQuantity: Number.parseInt(input),
      weight: weight,
    };
    if (selectedMeal === 'breakfast') {
      updatedPlan[0].plan.breakfast.push(item);
    } else if (selectedMeal === 'lunch') {
      updatedPlan[0].plan.lunch.push(item);
    } else if (selectedMeal === 'dinner') {
      updatedPlan[0].plan.dinner.push(item);
    } else {
      console.log('invalid parameters');
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    updatePlan(updatedPlan[0], config);

    setSelectedPlan(updatedPlan[0]);
    setDisplayType('plan');
  };
  const data = {
    labels: ['Carbs', 'Fat', 'Protein'],
    datasets: [
      {
        label: '# of calories',
        data: [
          counter(displayItem.food.nutrients.CHOCDF),
          counter(displayItem.food.nutrients.FAT),
          counter(displayItem.food.nutrients.PROCNT),
        ],
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
  return (
    <div className="itemDisplayContainer">
      {displayItem && (
        <div className="itemDisplay">
          <h2>{displayItem.food.label}</h2>
          <div className="itemPeripherals card">
            <ImageWithFallback
              src={displayItem.food.image}
              defaultSrc={Food}
              alt={displayItem.food.label}
            />
          </div>
          <div className="nutrition">
            <div className="quickStats card">
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
            <div className="chart card">
              <p>CALORIES FROM</p>
              <div className="pieChart">
                <Pie height={200} width={200} data={data} />
              </div>
            </div>
          </div>
          {plans.length !== 0 && (
            <div className="itemSelectors card">
              <div>
                <label htmlFor="measurement">Measurement:</label>
                <select name="measurement" id="measurement" value={select} onChange={selectHandler}>
                  {displayItem.measures.map((item) => (
                    <option value={item.label} key={displayItem.measures.indexOf(item)}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={input}
                  onChange={inputHandler}
                />
              </div>
              <div>
                <label htmlFor="plan">Plan:</label>
                <select name="plan" id="plan" value={itemSelectedPlan} onChange={planHandler}>
                  {plans.map((plan) => (
                    <option value={plan._id} key={plans.indexOf(plan)}>
                      {plan.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="meal">Meal:</label>
                <select name="meal" id="meal" value={selectedMeal} onChange={mealHandler}>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <button onClick={addToPlan}>Add to Plan</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
