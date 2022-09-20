import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { items: [] };

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state) => state.restaurant.restaurant;
export default restaurantSlice.reducer;

// Can still subscribe to the store
//  store.subscribe(() => console.log(store.getState()));
