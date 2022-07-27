import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
  const [amountIsVaild, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // 문자열로 받기 때문에 숫자로 변경해줘야 함
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0) {
      console.log(enteredAmountNumber);
      setAmountIsValid(false);
      return;
    }
    console.log(props.onAddToCart);
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        lab="Amount"
        inp={{
          id: `amount_+${props.id}`,
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
          // input의 내장요소들을 props로사용하기 위함
        }}
      />
      <button>+ 추가</button>
      {!amountIsVaild && <p>유효한 수량을 입력하세요.</p>}
    </form>
  );
}
