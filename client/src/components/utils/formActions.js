// validate form input
const validate = (element, formData = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = !valid ? "Must be a valid email" : "";
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = !valid ? "Password do not match!" : "";
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = !valid ? "This field is required" : "";
    error = !valid ? [valid, message] : error;
  }

  return error;
};

// form input change event
export const update = (element, formData, formName) => {
  let newFormData = { ...formData };

  let newElement = {
    ...newFormData[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formData);

    const [valid, message] = validData;

    newElement.valid = valid;
    newElement.validationMessage = message;
  }

  newElement.touched = element.blur;

  newFormData[element.id] = newElement;

  return newFormData;
};

// Get form data
export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formData[key].value;
    }
  }

  return dataToSubmit;
};

// validate form data
export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }

  return formIsValid;
};

// populate select field option (Brands and Woods)
export const populateOptionsFields = (formData, options = [], field) => {
  let arrOptions = [];

  const newFormData = { ...formData };

  options.forEach(option =>
    arrOptions.push({ key: option._id, value: option.name })
  );

  newFormData[field].config.options = arrOptions;

  return newFormData;
};

// Reset Add Product Form fields
export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    if (key === "images") {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = "";
    }

    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = "";
  }

  return newFormData;
};

// Update Profile populate input fields value
export const populateFields = (formData, userData) => {
  for (let key in formData) {
    formData[key].value = userData[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = "";
  }

  return formData;
};
