import React, { Component } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";

import FormField from "../utils/FormField";
import { update, generateData, isFormValid } from "../utils/formActions";

export class ResetPassword extends Component {
  state = {
    formError: false,
    formSuccess: false,
    resetToken: "",
    formErrorMessage: "",
    formData: {
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
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset_password");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset_user");
    let formValid = isFormValid(this.state.formData, "reset_user");

    if (formValid) {
      const { data } = await axios.post("/api/users/reset_password", {
        ...dataToSubmit,
        resetToken: this.state.resetToken
      });

      if (!data.success) {
        this.setState({ formError: true, formErrorMessage: data.message });
      } else {
        this.setState({ formError: false, formSuccess: true });
        setTimeout(() => this.props.history.push("/login"), 2000);
      }
    } else {
      this.setState({ formError: true });
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;

    this.setState({ resetToken });
  }

  render() {
    return (
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={this.submitForm}>
          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"password"}
                formData={this.state.formData.password}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"confirmPassword"}
                formData={this.state.formData.confirmPassword}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>
          {this.state.formError && (
            <div className="error_label">{this.state.formErrorMessage}</div>
          )}

          <button type="submit">Reset Password</button>
        </form>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Success!</div>
            <div>
              Your password was reseted. Now, redirecting you to login page.
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ResetPassword;
