import React from "react";
import classes from "./Input.module.css";

//사용자 지정 컴포넌트에서는 보통 ref가 동작하지 않지만, React.forwardRef를 사용하면 받을 수 있다.

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.inp.id}>{props.lab}</label>
      <input ref={ref} {...props.inp} />
      {/* ...props.inp은 MealItemForm에서 props로 사용될 inp의 모든 프로퍼티를 받아온다는 뜻 */}
    </div>
  );
});

export default Input;
