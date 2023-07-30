import axios from 'axios';

export const deletePlan = async (plan, config) => {
  const response = await axios.delete(
    `https://chrisgth-calorie-tracker.fly.dev/api/tracker/delete-plan/${plan._id}`,
    config,
  );
  return response;
};
