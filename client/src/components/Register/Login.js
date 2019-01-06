import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FormField from "../utils/FormField";
import { update, generateData, isFormValid } from "../utils/formActions";
import { userLogin } from "../../actions/user";

export class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "login");
    let formValid = isFormValid(this.state.formData, "login");

    if (formValid) {
      this.props.dispatch(userLogin(dataToSubmit)).then(res => {
        if (res.payload.success) {
          console.log(res.payload);
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"password"}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}

          <button onClick={this.submitForm}>Log In</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
