import axios from '../axios';

export const postNewPlan = async (user, config) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_API_URL}/api/tracker/new-plan`,
    {
      params: {
        title: 'Meal Plan',
        userID: user._id,
      },
    },
    config,
  );
  return response;
};
