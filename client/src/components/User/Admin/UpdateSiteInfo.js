import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../../utils/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/formActions";

import { getSiteData, updateSiteData } from "../../../actions/site";

export class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: "",
        config: {
          label: "Address",
          name: "address",
          type: "text",
          placeholder: "Enter your site address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          label: "Working Hours",
          name: "hours",
          type: "text",
          placeholder: "Enter your site working hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          label: "Phone Number",
          name: "phone",
          type: "text",
          placeholder: "Enter your phone number"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "Shop Email ",
          name: "email",
          type: "text",
          placeholder: "Enter your email"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "site_info");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "site_info");
    let formValid = isFormValid(this.state.formData, "site_info");

    if (formValid) {
      this.props
        .dispatch(updateSiteData(dataToSubmit))
        .then(() =>
          this.setState({ formSuccess: true }, () =>
            setTimeout(() => this.setState({ formSuccess: false }), 200)
          )
        );
    } else {
      this.setState({ formError: true });
    }
  };

  componentDidMount() {
    this.props.dispatch(getSiteData()).then(() => {
      const newFormData = populateFields(
        this.state.formData,
        this.props.site.siteData[0]
      );

      this.setState({ formData: newFormData });
    });
  }

  render() {
    return (
      <div>
        <form>
          <h1>Site Info </h1>
          <div>
            <FormField
              id={"address"}
              formData={this.state.formData.address}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            <FormField
              id={"phone"}
              formData={this.state.formData.phone}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            <FormField
              id={"hours"}
              formData={this.state.formData.hours}
              change={element => this.updateForm(element)}
            />
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
            <div className="form_success">Site Info Updated Successfully1</div>
          )}

          <button onClick={this.submitForm}>Create An Account</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  site: state.site
});

export default connect(mapStateToProps)(UpdateSiteInfo);
