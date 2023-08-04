import axios from 'axios';

export const updatePlan = async (plan, config) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BACKEND_API_URL}/api/tracker/update-plan`,
    {
      params: {
        plan: plan,
      },
    },
    config,
  );
  return response;
};
