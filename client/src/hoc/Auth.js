import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { authUser } from "../actions/user";

export default function(ComposedClass, reload, adminRoute = null) {
  class AuthCheck extends Component {
    state = {
      loading: false
    };

    componentDidMount() {
      this.mounted = true;

      this.props.dispatch(authUser()).then(res => {
        let user = this.props.user.userData;

        if (user && !user.isAuth) {
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          // regular user
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }

        if (this.mounted) {
          this.setState({ loading: false });
        }
      });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthCheck);
}
