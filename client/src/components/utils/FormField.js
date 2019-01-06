import React from "react";

const FormField = ({ formData, change, id }) => {
  const showError = () => {
    let errorMessage = "";

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let template = "";

    switch (formData.element) {
      case "input":
        template = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <input
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        template = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <select
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      case "textarea":
        template = (
          <div className="formBlock">
            {formData.showLabel && (
              <div className="label_inputs">{formData.config.label}</div>
            )}
            <textarea
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;

      default:
        template = "";
    }

    return template;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
