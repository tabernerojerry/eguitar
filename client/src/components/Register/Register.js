import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";

import FormField from "../utils/FormField";
import { update, generateData, isFormValid } from "../utils/formActions";
import { userRegister } from "../../actions/user";

export class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      firstName: {
        element: "input",
        value: "",
        config: {
          name: "firstName",
          type: "text",
          placeholder: "Enter your first name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastName: {
        element: "input",
        value: "",
        config: {
          name: "lastName",
          type: "text",
          placeholder: "Enter your last name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
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
    const newFormData = update(element, this.state.formData, "register");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formValid = isFormValid(this.state.formData, "register");

    if (formValid) {
      this.props.dispatch(userRegister(dataToSubmit)).then(res => {
        if (res.payload.success) {
          this.setState({ formError: false, formSuccess: true });
          setTimeout(() => this.props.history.push("/login"), 3000);
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
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"firstName"}
                      formData={this.state.formData.firstName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastName"}
                      formData={this.state.formData.lastName}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={"email"}
                    formData={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
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
                  <div className="error_label">Please check your data</div>
                )}

                <button onClick={this.submitForm}>Create An Account</button>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations!!!</div>
            <div>
              You will be redirected to login page in a couple of seconds...
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
