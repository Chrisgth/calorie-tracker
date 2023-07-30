import axios from 'axios';

export const getPlans = async (config) => {
  const response = await axios.get(
    'https://chrisgth-calorie-tracker.fly.dev/api/tracker/get-plans',
    config,
  );
  return response;
};
