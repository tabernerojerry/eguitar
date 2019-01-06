import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
  {
    name: "My Account",
    linkTo: "/user/dashboard"
  },
  {
    name: "User Information",
    linkTo: "/user/profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const adminLinks = [
  {
    name: "Site Info",
    linkTo: "/admin/site_info"
  },
  {
    name: "Add Product",
    linkTo: "/admin/add_product"
  },
  {
    name: "Manage Categories",
    linkTo: "/admin/manage_categories"
  }
];

const generateLinks = links =>
  links.map((item, index) => (
    <Link key={index} to={item.linkTo}>
      {item.name}
    </Link>
  ));

const UserLayout = props => {
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>

          {props.user.userData && props.user.userData.isAdmin ? (
            <>
              <h2>Admin</h2>
              <div className="links">{generateLinks(adminLinks)}</div>
            </>
          ) : null}
        </div>

        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
