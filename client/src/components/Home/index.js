import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "./Slider";
import Promotion from "./Promotion";
import CardBlock from "../utils/CardBlock";

import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/products";

export class Home extends Component {
  async componentDidMount() {
    await this.props.dispatch(getProductsByArrival());
    await this.props.dispatch(getProductsBySell());
  }
  render() {
    return (
      <div>
        <Slider />
        <CardBlock
          title="Best Selling Guitars"
          items={this.props.products.bySell}
        />
        <Promotion />
        <CardBlock title="New Arrivals" items={this.props.products.byArrival} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Home);
