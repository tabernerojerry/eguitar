import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PageTop from "../utils/PageTop";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

import { addToCart } from "../../actions/user";
import { getProductDetail, clearProductDetail } from "../../actions/products";

class Product extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;

    this.props.dispatch(getProductDetail(id)).then(() => {
      if (!this.props.products.productDetail) {
        // redirect to shop if product not exist
        this.props.history.push("/shop");
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  // User Add Product to Cart
  addToCartHandler = id => this.props.dispatch(addToCart(id));

  render() {
    return (
      <div>
        <PageTop title="Product Detail" />
        <div className="container">
          {this.props.products.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImage detail={this.props.products.productDetail} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.productDetail}
                />
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(withRouter(Product));
