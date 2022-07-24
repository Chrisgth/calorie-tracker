import axios from "axios";

export const getPlans = async (config) => {
  const response = await axios.get(
    "http://localhost:5000/api/tracker/get-plans",
    config
  );
  console.log(response);
  return response;
};
