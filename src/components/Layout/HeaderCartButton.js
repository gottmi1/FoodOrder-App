import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  // 컨텍스트가 변경될 때 마다 해당 컴포넌트를 업데이트(Provider로 App전체를 감쌌기 때문에 모든 컨텍스트를 감시 가능하다)시킨다.
  const { items } = cartCtx;

  const [btnIsOn, setBtnIsOn] = useState(false);

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${btnIsOn ? classes.bump : ""}`;
  // btnIsOn state가 true일 때만, bump클래스를 준다.

  useEffect(() => {
    if (items.length === 0) {
      return;
      // items의 길이가 0이면 그냥 리턴
    }
    setBtnIsOn(true);
    // 이렇게만 하면 bump클래스를 계속 가지고 있기 때문에
    const timer = setTimeout(() => {
      setBtnIsOn(false);
    }, 300);
    // setTimeout을 사용하여 bump클래스를 지워준다.
    return () => {
      // ※useEffect에서 함수를 반환하면 리액트에 의해 클린업함수로 자동 호출된다.
      clearTimeout(timer);
      // 클린업 해주면 여러번 호출 했을 때, 300밀리 세컨드보다 빠르게 호출되었다면 이전 호출은 지워버리고 새로 호출되어, setTimeout의 시간을 연장시키기 떄문에 반복해서 호출되지않는다.
    };
    // 이 어플리케이션에선 크게 중요하지않지만, 클린업으로 사이드 이펙트를 정리해주는 것은 좋은 습관이다.
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>장바구니</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
