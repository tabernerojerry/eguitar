import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

import Button from "../utils/Button";

const ProductInfo = ({ detail, addToCart }) => {
  return (
    <div>
      <h1>
        {detail.brand && detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      <div className="product_tags">
        {detail.shipping ? (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className="tag_text">
              <div>Free Shipping</div>
              <div>And Return</div>
            </div>
          </div>
        ) : null}
        {detail.available ? (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className="tag_text">
              <div>Available</div>
              <div>In Store</div>
            </div>
          </div>
        ) : (
          <div className="tag">
            <div>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="tag_text">
              <div>Not Available</div>
              <div>Preorder Only</div>
            </div>
          </div>
        )}
      </div>

      <div className="product_actions">
        <div className="price">$ {detail.price}</div>
        <div className="cart">
          <Button
            type="add_to_cart_link"
            runAction={() => addToCart(detail._id)}
          />
        </div>
      </div>

      <div className="product_specifications">
        <h2>Specification:</h2>
        <div>
          <div className="item">
            <strong>Frets: </strong>
            {detail.frets}
          </div>
          <div className="item">
            <strong>Wood: </strong>
            {detail.wood && detail.wood.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
