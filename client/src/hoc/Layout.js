import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getSiteData } from "../actions/site";

export class Layout extends Component {
  async componentDidMount() {
    if (Object.keys(this.props.site).length === 0) {
      await this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  site: state.site
});

export default withRouter(connect(mapStateToProps)(Layout));
