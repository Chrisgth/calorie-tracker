import axios from 'axios';

export const getPlans = async (config) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/api/tracker/get-plans`,
    config,
  );
  return response;
};
