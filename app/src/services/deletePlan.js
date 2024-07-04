import axios from '../axios';

export const deletePlan = async (plan, config) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_API_URL}/api/tracker/delete-plan/${plan._id}`,
    config,
  );
  return response;
};
