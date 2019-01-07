import React, { Component } from "react";
import axios from "axios";

import FormField from "../utils/FormField";
import { update, generateData, isFormValid } from "../utils/formActions";

export class index extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email",
          type: "text",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset_user");

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
      const { data } = await axios.post("/api/users/reset_user", dataToSubmit);

      if (data.success) {
        this.setState(
          {
            formSuccess: true
          },
          () => setTimeout(() => this.setState({ formSuccess: false }), 2000)
        );
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Reset Password</h1>
        <form onSubmit={this.submitForm}>
          <div>
            <FormField
              id={"email"}
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>

          {this.state.formSuccess && (
            <div className="form_success">
              Success! Kindly check your email.
            </div>
          )}

          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}

          <button type="submit">SEND EMAIL TO RESET PASSWORD</button>
        </form>
      </div>
    );
  }
}

export default index;
