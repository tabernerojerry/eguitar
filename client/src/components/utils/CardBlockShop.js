import React from "react";

import Card from "./Card";

const CardBlockShop = props => {
  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.lists ? (
            props.lists.length === 0 ? (
              <div className="no_results">Sorry, no results.</div>
            ) : (
              props.lists.map(item => (
                <Card key={item._id} {...item} grid={props.grid} />
              ))
            )
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;
