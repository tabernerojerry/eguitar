import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTH from "@fortawesome/fontawesome-free-solid/faTh";

import PageTop from "../utils/PageTop";
import CollapseCheckbox from "../utils/CollapseCheckbox";
import CollapseRadio from "../utils/CollapseRadio";
import { frets, price } from "../utils/fixedCategories";
import { getBrands, getWoods, getProductsToShop } from "../../actions/products";

import LoadMoreCard from "./LoadMoreCards";

export class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [], // name should be the same on your MongoDB Model
      frets: [],
      wood: [], // name should be the same on your MongoDB Model
      price: []
    }
  };

  // react lifecycle
  async componentDidMount() {
    // Get Brands
    await this.props.dispatch(getBrands());
    // Get Woods
    await this.props.dispatch(getWoods());
    // Get Products by filters
    await this.props.dispatch(
      getProductsToShop(this.state.limit, this.state.skip, this.state.filters)
    );
  }

  // get filter price value  methed
  handlePrice = value => {
    const data = price;
    let arr = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        arr = data[key].array;
        break;
      }
    }

    return arr;
  };

  // filters products method
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({ filters: newFilters });
  };

  // display filtered products
  showFilteredResults = async filters => {
    await this.props.dispatch(getProductsToShop(this.state.limit, 0, filters));
    this.setState({ skip: 0 });
  };

  // load cards method
  loadMoreCards = async () => {
    const skip = this.state.skip + this.state.limit;

    await this.props.dispatch(
      getProductsToShop(
        this.state.limit,
        skip,
        this.state.filters,
        this.props.products.toShop
      )
    );

    this.setState({ skip });
  };

  // grid layout method
  handleGrid = () =>
    this.setState({ grid: !this.state.grid ? "grid_bars" : "" });

  render() {
    const { products } = this.props;

    return (
      <div>
        <PageTop title="Browse Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                lists={products.brands}
                title="Brands"
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                lists={frets}
                title="Frets"
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={false}
                lists={products.woods}
                title="Wood"
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                lists={price}
                title="Price"
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <FontAwesomeIcon icon={faTH} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCard
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Shop);
