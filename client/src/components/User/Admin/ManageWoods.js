import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../../utils/FormField";

import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/formActions";
import { getWoods, addWood } from "../../../actions/products";

export class ManageWoods extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name",
          type: "text",
          placeholder: "Enter the brand"
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

  async componentDidMount() {
    await this.props.dispatch(getWoods());
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "woods");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "woods");

    this.setState({ formSuccess: true, formData: newFormData });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "woods");
    let formValid = isFormValid(this.state.formData, "woods");
    let existingWoods = this.props.products.woods;

    if (formValid) {
      const { payload } = await this.props.dispatch(
        addWood(dataToSubmit, existingWoods)
      );

      payload.success
        ? this.resetFieldHandler()
        : this.setState({ formError: true });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    const { products } = this.props;
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {products.woods
                ? products.woods.map(item => (
                    <div className="category_item" key={item._id}>
                      {item.name}
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formError && (
                <div className="error_label">Please check your data</div>
              )}
              <button onClick={this.submitForm}>Add Wood</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(ManageWoods);
