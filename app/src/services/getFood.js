import axios from 'axios';

export const getFood = async (food) => {
  const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
    params: {
      app_id: process.env.REACT_APP_APP_ID,
      app_key: process.env.REACT_APP_APP_KEY,
      ingr: food,
    },
  });
  return response;
};
