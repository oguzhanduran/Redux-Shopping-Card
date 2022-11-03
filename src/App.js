import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import CartItems from "./components/CartItems";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  const itemsList = useSelector((state) => state.cart.itemsList);
  console.log(itemsList);
  return (
    <div className="App">
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
