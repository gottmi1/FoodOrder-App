import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        다양한 종류 중 가장 좋아하는 음식을 선택하세요. 즐거운 점심 혹은 저녁을
        집에서 즐겨보세요.
      </p>
      <p>
        모든 음식은 고품질의 재료로 적시에 조리합니다. 물론 전문 셰프들이
        말이죠.
      </p>
    </section>
  );
};

export default MealsSummary;
