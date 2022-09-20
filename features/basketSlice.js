import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { items: [] };

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) newBasket.splice(index, 1);
      else
        console.warn(
          `Can't remove product with ID ${action.payload.id} as it does not exist in the basket!`
        );
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export default basketSlice.reducer;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

// Can still subscribe to the store
//  store.subscribe(() => console.log(store.getState()));
