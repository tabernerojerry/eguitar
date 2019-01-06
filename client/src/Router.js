import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Auth from "./hoc/Auth";

import Home from "./components/Home";
import RegisterLogin from "./components/Register";
import Register from "./components/Register/Register";
import Shop from "./components/Shop";
import Product from "./components/Product";

import UserDashboard from "./components/User";
import AddProduct from "./components/User/Admin/AddProduct";
import ManageCategories from "./components/User/Admin/ManageCategories";
import UserCart from "./components/User/UserCart";
import UpdateProfile from "./components/User/UpdateProfile";
import ManageSite from "./components/User/Admin/ManageSite";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              exact
              path="/user/dashboard"
              component={Auth(UserDashboard, true)}
            />
            <Route exact path="/user/cart" component={Auth(UserCart, true)} />
            <Route
              exact
              path="/user/profile"
              component={Auth(UpdateProfile, true)}
            />

            <Route
              exact
              path="/admin/add_product"
              component={Auth(AddProduct, true)}
            />
            <Route
              exact
              path="/admin/manage_categories"
              component={Auth(ManageCategories, true)}
            />
            <Route
              exact
              path="/admin/site_info"
              component={Auth(ManageSite, true)}
            />

            <Route exact path="/" component={Auth(Home, null)} />
            <Route exact path="/shop" component={Auth(Shop, null)} />
            <Route exact path="/product/:id" component={Auth(Product, null)} />

            <Route exact path="/login" component={Auth(RegisterLogin, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Router;
