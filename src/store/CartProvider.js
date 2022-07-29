import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // 어떤 조건에서도 같아야 할 값

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // findIndex메서드는 주어진 조건을 만족하는 배열의 첫 번쨰요소에 대한 인덱스를 반환한다.
    const existingCartItem = state.items[existingCartItemIndex];
    // 현재 선택한 것(action.item.id)가 이미 장바구니에 있는(item.id) 경우에 같은 인덱스 자리에 놓기 위함

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // 위에 만들어진 객체를 그대로 담는 배열을 만들어 불변성을 지킨다
      updatedItems[existingCartItemIndex] = updatedItem;
      // 그 후 업데이트된 인덱스의 상태를 업데이트 해줌.
      // 선택한 물품이 이미 장바구니에 있을 때 추가하는 로직
    } else {
      updatedItems = state.items.concat(action.item);
    }
    // 불변성유지를 위해 concat을 사용한다

    return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // 액션 타입 REMOVE에선 item전체가 아니라 id만 전달 받도록 액션생성함수에서 설정해놓았으므로 item.id가 아닌item을 받아온다.
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // ※action.id는 별게 아니라, 현재 선택한(action이 일어난) 놈의 id란 뜻이다.
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // 위 조건이 참이 되는 요약 : 액션이 일어난 놈만 필터하고 나머지를 넣은 배열을 반환. === 할 경우 액션이 일어난 놈만 반환하고 나머지를 필터링한다.
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

export default function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
