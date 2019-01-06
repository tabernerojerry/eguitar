import React from "react";
import { connect } from "react-redux";

import Button from "./Button";

import { addToCart } from "../../actions/user";

const Card = props => {
  const renderCardImage = images =>
    images.length > 0 ? images[0].url : "/images/image_not_available.png";

  const addProductToCart = id => async () =>
    props.user.userData.isAuth
      ? await props.dispatch(addToCart(id))
      : console.log("You need to login to add product to your cart");

  return (
    <div className={`card_item_wrapper ${props.grid}`}>
      <div
        className="image"
        style={{
          background: `url(${renderCardImage(props.images)}) no-repeat`
        }}
      />
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.brand.name}</div>
          <div className="name">{props.name}</div>
          <div className="price">${props.price}</div>
        </div>

        {props.grid ? (
          <div className="description">
            <p>{props.description}</p>
          </div>
        ) : null}

        <div className="actions">
          <div className="button_wrapp">
            <Button
              type="default"
              altClass="card_link"
              title="View Product"
              linkTo={`/product/${props._id}`}
              addStyles={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="button_wrapp">
            <Button type="bag_link" runAction={addProductToCart(props._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Card);
