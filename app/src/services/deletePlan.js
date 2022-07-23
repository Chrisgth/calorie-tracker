import axios from "axios";

export const deletePlan = async (plan, config) => {
  const response = await axios.delete(
    `http://localhost:5000/api/tracker/delete-plan/${plan._id}`,
    config
  );
  return response;
};
