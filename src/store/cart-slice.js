import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false, // we can check whenever the data will be changed then only we need to run this render. Then only we need to run this render.
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalPrice;
      state.itemsList = action.payload.itemsList;
    }, // The data at the beginning is empty. Just replace the empty data with the data we have in the Firebase to update the content of the cart
    addToCart(state, action) {
      const newItem = action.payload;
      state.changed = true; // When a cart add the notification will be shown.

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
      state.changed = true; // When a cart remove the notification will be shown.

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

// Sending the shopping card data to the backend.

// For async code the first option inside the components using the useEffect hook. We can do inside the product.js whenever we are sending the data to the cart, we can add the useEffect hook.

// Second option is to create action creater which would allow us to run async code these are the two main options. For this we will use firebase. Firebase is a great tool is don't require any backend codes so we can go to the firebase and we can create our account with firebase. It will allow us to create new firebase project.

// if we directly add a product from the product item component, so it would be wrong. Because if we only send the data to the backend and it doesn't have any logic, reducer functions will be no use then. Because if we send any single product two times into the backend then the backend doesn't know that this product is already being part of the cart
