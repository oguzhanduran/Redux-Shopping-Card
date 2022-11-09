import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { fetchData, sendCartData } from "./store/cart-actions";

let isFirstRender = true;

function App() {
  const cart = useSelector((state) => state.cart); // We can grap the cart state from here and then we can just send an HTTP request from there. So we can add here useEffect.
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  // whenever we are opening the application it is sending the data to the database when the first render is complete when the firstRender complete, the second render is completed. Whenever this request will successful whenever the application open this request will be run.

  useEffect(() => {
    if (cart.changed) {
      dispatch(fetchData());
    }
  }, [dispatch]); // whenever we get the request the application will be open

  useEffect(() => {
    if (isFirstRender) {
      // we did it because we don't want to show notification on the first render on the screen.
      isFirstRender = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]); // cart value was changed put request will be sent to the backend. Whenever the data will be changed inside the Redux slices Redux reducers. The useEffect will be modified and it will be send the request to the redux by the HTTP.

  // I'am sending this request. But I am not doing anything with the response, which I will get from the server. So I'am not handling any type of potential errors that could occur during this fetch function. We will create a notification component so that we should be notified about the errors and then the state of the Redux that how and when the Redux state is updated. So first, we have to convert this fetch function into asynchoronous function.

  // We have to create a notification component. And then we have to create the slice and the new state for the notification to handle all of the state from the UI.

  // We deleted it because it is of nouse.
  // const itemsList = useSelector((state) => state.cart.itemsList);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} /> // we sent the props to the notification component by getting from uiSlice.
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;

// // So we can first do the work on the fronend and let the Redux update the store. And second after that we will send the request to the server. So we do it in app.js.

// Thunk is a function that delays an action until later. We can write an action creator as thunk. This does not return the action object but which returns another function which returns the action. We can run the other code before we dispatch the actual action object.
