import axios from "axios";

export const updatePlan = async (plan, config) => {
  const response = await axios.put(
    "http://localhost:5000/api/tracker/update-plan",
    {
      params: {
        plan: plan,
      },
    },
    config
  );
  return response;
};
