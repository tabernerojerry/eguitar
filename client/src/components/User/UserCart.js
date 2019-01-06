import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";

import {
  getCartItems,
  removeCartItem,
  authUser,
  onSuccessBuy
} from "../../actions/user";

import UserLayout from "../../hoc/UserLayout";
import ProductBlock from "../utils/User/ProductBlock";

import Paypal from "../utils/Paypal";

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += item.price * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };

  async componentDidMount() {
    await this.props.dispatch(authUser());

    let cartItems = [];
    let { user } = this.props;

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => cartItems.push(item.id));

        const { payload } = await this.props.dispatch(
          getCartItems(cartItems, user.userData.cart)
        );

        if (payload.length > 0) {
          this.calculateTotal(payload);
        }
      }
    }
  }

  // Remove Item to user cart
  removeItemFromCart = async id => {
    await this.props.dispatch(removeCartItem(id));
    if (this.props.user.cartDetail.length <= 0) {
      this.setState({ showTotal: false });
    } else {
      this.calculateTotal(this.props.user.cartDetail);
    }
  };

  // Paypal transaction error
  transactionError = data => {
    console.log("Paypal Error: ", data);
  };

  transactionCancelled = data => {
    console.log("Transaction Cancelled:", data);
  };

  transactionSuccess = data => {
    this.props
      .dispatch(
        onSuccessBuy({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <h1>My Cart</h1>
        <div className="user_cart">
          <ProductBlock
            items={this.props.user}
            type="cart"
            removeItemFromCart={id => this.removeItemFromCart(id)}
          />

          {this.state.showTotal ? (
            <div>
              <div className="user_cart_sum">
                <div>Total Amount: $ {this.state.total}</div>
              </div>
            </div>
          ) : this.state.showSuccess ? (
            <div className="cart_success">
              <FontAwesomeIcon icon={faSmile} />
              <div>Thank You!</div>
              <div>Your order is now complete </div>
            </div>
          ) : (
            <div className="cart_no_items">
              <FontAwesomeIcon icon={faFrown} />
              <div>You have no items.</div>
            </div>
          )}

          {this.state.showTotal ? (
            <div className="paypal_button_container">
              <Paypal
                toPay={this.state.total}
                onError={data => this.transactionError(data)}
                onCancel={data => this.transactionCancelled(data)}
                onSuccess={data => this.transactionSuccess(data)}
              />
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserCart);
