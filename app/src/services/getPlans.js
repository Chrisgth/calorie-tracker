import axios from "axios";

export const getPlans = async (config) => {
  const response = await axios.get(
    "https://chrisgth-calorie-tracker.herokuapp.com/api/tracker/get-plans",
    config
  );
  console.log(response);
  return response;
};
