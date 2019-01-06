import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../../utils/FormField";
import UserLayout from "../../../hoc/UserLayout";
import FileUpload from "../../utils/fileUpload";

import {
  update,
  generateData,
  isFormValid,
  populateOptionsFields,
  resetFields
} from "../../utils/formActions";
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from "../../../actions/products";

export class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product Name",
          name: "name",
          type: "text",
          placeholder: "Enter your product name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product Description",
          name: "description",
          type: "text",
          placeholder: "Enter your product description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product Price",
          name: "price",
          type: "number",
          placeholder: "Enter your product price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product Brand",
          name: "brand",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Product Shipping",
          name: "shipping",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Product Available in Stock",
          name: "available",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      wood: {
        element: "select",
        value: "",
        config: {
          label: "Product Wood Material",
          name: "wood",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      frets: {
        element: "select",
        value: "",
        config: {
          label: "Product Guitar Frets",
          name: "frets",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish Product",
          name: "publish",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showLabel: false
      }
    }
  };

  updateFields = newFormdata => this.setState({ formData: newFormdata });

  componentDidMount() {
    const formData = this.state.formData;

    this.props.dispatch(getBrands()).then(() => {
      const newFormdata = populateOptionsFields(
        formData,
        this.props.products.brands,
        "brand"
      );
      this.updateFields(newFormdata);
    });

    this.props.dispatch(getWoods()).then(() => {
      const newFormdata = populateOptionsFields(
        formData,
        this.props.products.woods,
        "wood"
      );
      this.updateFields(newFormdata);
    });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");

    this.setState({ formSuccess: true, formData: newFormData });

    setTimeout(
      () =>
        this.setState({ formSuccess: false }, () =>
          this.props.dispatch(clearProduct())
        ),

      3000
    );
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formValid = isFormValid(this.state.formData, "products");

    if (formValid) {
      await this.props.dispatch(addProduct(dataToSubmit));

      this.props.products.addProduct.success
        ? this.resetFieldHandler()
        : this.setState({ formError: true });
    } else {
      this.setState({ formError: true });
    }
  };

  // Get Images uploaded from Cloudinary
  uploadImagesHandler = images => {
    const newFormData = {
      ...this.state.formData
    };

    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({ formData: newFormData });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={this.submitForm}>
            <FileUpload
              uploadImagesHandler={images => this.uploadImagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={"name"}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formData={this.state.formData.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formData={this.state.formData.price}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"brand"}
              formData={this.state.formData.brand}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"shipping"}
              formData={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"available"}
              formData={this.state.formData.available}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"wood"}
              formData={this.state.formData.wood}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"frets"}
              formData={this.state.formData.frets}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"publish"}
              formData={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />

            {this.state.formError && (
              <div className="error_label">Please check your data</div>
            )}

            {this.state.formSuccess && (
              <div className="form_success">Product was added succssfully.</div>
            )}

            <button onClick={this.submitForm}>Add Product</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(AddProduct);
