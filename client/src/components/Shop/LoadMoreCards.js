import React from "react";

import CardBlockShop from "../utils/CardBlockShop";

const LoadMoreCards = props => {
  return (
    <div>
      <div>
        <CardBlockShop grid={props.grid} lists={props.products} />
      </div>
      {// display load more button
      props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMoreCards;
