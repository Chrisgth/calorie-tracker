import axios from "axios";

export const postNewPlan = async (user, config) => {
  const response = await axios.post(
    "http://localhost:5000/api/tracker/new-plan",
    {
      params: {
        title: "Meal Plan",
        userID: user._id,
      },
    },
    config
  );
  console.log(response);
};
