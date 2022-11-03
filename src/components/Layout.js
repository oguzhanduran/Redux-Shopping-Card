import React from "react";
import Header from "./Header";
import Products from "./Products";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";

import "./Layout.css";
const Layout = () => {
  let itemsList = useSelector((state) => state.cart.itemsList);
  let total = 0;

  itemsList.forEach((item) => {
    total += item.totalPrice;
  }); // each product has its own total price. With total we sum all of the products.

  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        {showCart && <CartItems />}
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
