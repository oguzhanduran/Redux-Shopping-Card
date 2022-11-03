import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItems = () => {
  const itemsList = useSelector((state) => state.cart.itemsList);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {itemsList.map((item) => (
          <li key={item.id}>
            <CartItem
              id={item.id}
              price={item.price}
              name={item.name}
              total={item.totalPrice}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
