import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    // addItem은 컨텍스트에 정의된 메서드 중 하나임.
    // 밸류는 addItemToCartHandler인데, 이 함수는 Provider에서 설정했다.
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    // 콘텍스트와 같은 key값을 가진 것들을 넣어줘야 함.
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
