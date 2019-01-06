import React from "react";

import Button from "../utils/Button";

const Promotion = props => {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitar",
    linkTitle: "Shop Now",
    linkTo: "/shop"
  };

  const renderPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{ background: `url(${promotion.img})` }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag title">{promotion.lineTwo}</div>
        <div>
          <Button
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{ margin: "10px 0 0 0" }}
          />
        </div>
      </div>
    ) : null;

  return <div className="home_promotion">{renderPromotion()}</div>;
};

export default Promotion;
