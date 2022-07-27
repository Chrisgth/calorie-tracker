import axios from 'axios';

export const updatePlan = async (plan, config) => {
  const response = await axios.put(
    'https://chrisgth-calorie-tracker.herokuapp.com/api/tracker/update-plan',
    {
      params: {
        plan: plan,
      },
    },
    config,
  );
  return response;
};
