import { createContext } from "react";

const CartContext = createContext({
  items: [],
  totlaAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;

// context에는 전역에서 관리할 필요가 있는 데이터들을 주로 놓음.
