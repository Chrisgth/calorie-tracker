import axios from "axios";

export const deletePlan = async (plan, config) => {
  const response = await axios.delete(
    `https://chrisgth-calorie-tracker.herokuapp.com/http://localhost:5000/api/tracker/delete-plan/${plan._id}`,
    config
  );
  return response;
};
