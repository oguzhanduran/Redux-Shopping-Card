import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-ee070-default-rtdb.firebaseio.com/cartItems.json"
      );

      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData)); // it will replace all of the data with the cart data which we have in the firebase. And it will reflect on to the frontend.
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true, // When we add any data it will work.
          message: "Sending Request failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true, // When we add any data it will work.
        message: "Sending Request",
        type: "warning",
      })
    );

    const sendRequest = async () => {
      // Send state as Sending request

      const res = await fetch(
        "https://redux-http-ee070-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // Send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true, // When we add any data it will work.
          message: "Sent Request to Database Successfully",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true, // When we add any data it will work.
          message: "Sending Request failed",
          type: "error",
        })
      );
    }
  };
};

// we need to create one more reducer function in the card slice to get the data and update the data on to the Redux and the front end also.
