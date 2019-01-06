import React from "react";

const ProductBlock = ({ items, removeItemFromCart }) => {
  return (
    <div>
      {items.cartDetail &&
        items.cartDetail.map(item => (
          <div className="user_product_block" key={item._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${
                    item.images.length > 0
                      ? item.images[0].url
                      : "/images/image_not_available.png"
                  }) no-repeat`
                }}
              />
            </div>
            <div className="item">
              <h4>Product Name</h4>
              {item.brand.name} {item.name}
            </div>
            <div className="item">
              <h4>Quantity</h4>
              {item.quantity}
            </div>
            <div className="item">
              <h4>Price</h4>$ {item.price}
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItemFromCart(item._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductBlock;
