import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../utils/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../utils/formActions";

import {
  authUser,
  updateProfile,
  clearUpdateProfile
} from "../../actions/user";

export class UpdatePersonalInfo extends Component {
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
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "update_user");
    let formValid = isFormValid(this.state.formData, "update_user");

    if (formValid) {
      this.props.dispatch(updateProfile(dataToSubmit)).then(() => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              formSuccess: true
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateProfile());
                this.setState({ formSuccess: false });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };

  async componentDidMount() {
    await this.props.dispatch(authUser());

    const newFormData = populateFields(
      this.state.formData,
      this.props.user.userData
    );

    this.setState({ formData: newFormData });
  }

  render() {
    return (
      <div>
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

          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}

          {this.state.formSuccess && (
            <div className="form_success">Account Updated Successfully!</div>
          )}

          <button onClick={this.submitForm}>Update Account</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UpdatePersonalInfo);
