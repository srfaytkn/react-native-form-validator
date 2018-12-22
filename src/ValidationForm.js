import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import rules from "./rules";

export default class ValidationForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.validationComponents = [];
    this.attachToForm = this.attachToForm.bind(this);
  }

  isValid() {
    return this.validationComponents.every(component => component.isValid(rules));
  }

  validate() {
    const { onSubmit, onError } = this.props;

    if (this.isValid()) {
      onSubmit();
      return;
    }

    if (onError) {
      onError();
    }
  }

  getChildContext() {
    return {
      form: {
        attachToForm: this.attachToForm,
      },
    };
  }

  attachToForm(component) {
    this.validationComponents.push(component);
  }

  render() {
    const { children, ...rest } = this.props;
    return <View {...rest}>{children}</View>;
  }
}

ValidationForm.addValidationRule = (name, callback) => {
  rules[name] = callback;
};

ValidationForm.childContextTypes = {
  form: PropTypes.element.object,
};

ValidationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onError: PropTypes.func,
};
