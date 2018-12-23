import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

let defaultErrorMessageStyle = {
  color: "white",
};

export default class ValidationComponent extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.context.form.attachToForm(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.component.props.value !== prevProps.component.props.value) {
      this.setState({ errorMessage: null });
    }
  }

  isValid(rules) {
    const { component, validators, errorMessages } = this.props;
    const value = component.props.value;
    return validators.every((validator, index) => {
      const args = validator.split(":");
      const rule = args.shift();
      const isValid = rules[rule].apply(this, [value, ...args]);
      if (!isValid) {
        this.setState({ errorMessage: errorMessages[index] });
      }
      return isValid;
    });
  }

  render() {
    const { component, style, errorMessageStyle } = this.props;
    const { errorMessage } = this.state;
    return (
      <View style={[{ flexDirection: "column" }, style]}>
        {component}
        {errorMessage && (
          <View>
            <Text style={errorMessageStyle || defaultErrorMessageStyle}>{errorMessage}</Text>
          </View>
        )}
      </View>
    );
  }
}

ValidationComponent.setDefaultErrorMessageStyle = style => {
  defaultErrorMessageStyle = style;
};

ValidationComponent.contextTypes = {
  form: PropTypes.object,
};

ValidationComponent.propTypes = {
  component: PropTypes.object,
  validators: PropTypes.array,
  errorMessages: PropTypes.array,
  errorMessageStyle: PropTypes.object,
  style: PropTypes.object,
};

ValidationComponent.defaultProps = {
  style: {},
};
