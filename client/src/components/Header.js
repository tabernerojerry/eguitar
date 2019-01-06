import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../actions/user";

export class Header extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/logout",
        public: false
      }
    ]
  };

  logoutHandler = async () => {
    const data = await this.props.dispatch(logoutUser());

    if (data.payload.success) {
      this.props.history.push("/");
    }
  };

  defaultLink = (item, index) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={index}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={index}>
        {item.name}
      </Link>
    );

  cartLink = (item, index) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={index}>
        <span>{user.cart.length > 0 ? user.cart.length : 0}</span>
        <Link to={item.linkTo} key={index}>
          {item.name}
        </Link>
      </div>
    );
  };

  showLinks = types => {
    let lists = [];

    if (this.props.user.userData) {
      types.forEach(type => {
        if (!this.props.user.userData.isAuth) {
          if (type.public) {
            lists.push(type);
          }
        } else {
          if (type.name !== "Log in") {
            lists.push(type);
          }
        }
      });
    }

    return lists.map((item, index) =>
      item.name !== "My Cart"
        ? this.defaultLink(item, index)
        : this.cartLink(item, index)
    );
  };
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(Header));
