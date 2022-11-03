import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;

      // if the item is already there we need to increase the item.

      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    }, // if we use action paramater, it means that we will get an action from the user. when we click addToCart function, related product will send to reducer function. And it will update. With action.payload we will get the addToCart functionolity.
    removeFromCart(state, action) {
      // if there is a item we will decrease the quantity. if there is a one item. We will remove the item.

      console.log("reached");

      const id = action.payload;

      const existingItem = state.itemsList.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      // const id = action.payload;
      // const existingItem = state.itemsList.find((item) => item.id === id);
      // if (existingItem.quantity === 1) {
      //   state.itemsList = state.itemsList.filter((item) => item.id !== id); // We remove existingItem as it has one item.
      // } else {
      //   existingItem.quantity--; // if there is more than 1 item, we should decrease the quantity.
      //   existingItem.totalPrice -= existingItem.price;
      // }
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
