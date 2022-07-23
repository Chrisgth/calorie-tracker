import axios from "axios";

export const postNewPlan = async (user, config) => {
  const response = await axios.post(
    "https://chrisgth-calorie-tracker.herokuapp.com/api/tracker/new-plan",
    {
      params: {
        title: "Meal Plan",
        userID: user._id,
      },
    },
    config
  );
  return response;
};
