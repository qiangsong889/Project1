const axios = require('axios')



export const selectRestaurant = (restaurant, data) => {

  return {
    type: "RESTAURANT_SELECTED",
    payload: {...restaurant, reviews: data},
  }
};

export const searchRestaurant = (data) => {
    console.log('inside of searchRestaurant action here is the data', data.businesses)
    return {
        type: "RESTAURANT_SEARCH",
        payload: data.businesses
    }
}

export const activeUser = (user) => {
  console.log('function user inside of action/index');
  return {
    type: 'ACTIVE_USER',
    payload: user
  }
}