import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const cart = useSelector((state) => state.cart); // We can grap the cart state from here and then we can just send an HTTP request from there. So we can add here useEffect.
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isFirstRender) {
      // we did it because we don't want to show notification on the first render on the screen.
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      // Send state as Sending request
      dispatch(
        uiActions.showNotification({
          open: true, // When we add any data it will work.
          message: "Sending Request",
          type: "warning",
        })
      );
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

    sendRequest().catch((err) => {
      // Send state as Error
      dispatch(
        uiActions.showNotification({
          open: true, // When we add any data it will work.
          message: "Sending Request failed",
          type: "error",
        })
      );
    });
  }, [cart]); // cart value was changed put request will be sent to the backend. Whenever the data will be changed inside the Redux slices Redux reducers. The useEffect will be modified and it will be send the request to the redux by the HTTP.

  // I'am sending this request. But I am not doing anything with the response, which I will get from the server. So I'am not handling any type of potential errors that could occur during this fetch function. We will create a notification component so that we should be notified about the errors and then the state of the Redux that how and when the Redux state is updated. So first, we have to convert this fetch function into asynchoronous function.

  // We have to create a notification component. And then we have to create the slice and the new state for the notification to handle all of the state from the UI.

  // We deleted it because it is of nouse.
  // const itemsList = useSelector((state) => state.cart.itemsList);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;

// // So we can first do the work on the fronend and let the Redux update the store. And second after that we will send the request to the server. So we do it in app.js.
