import React from "react";
import Card from "./Card";

const CardBlock = props => {
  const renderCard = items =>
    items ? items.map((item, index) => <Card key={index} {...item} />) : null;

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {renderCard(props.items)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
