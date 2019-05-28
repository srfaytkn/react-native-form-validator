# react-native-form-validator

[![npm version](https://badge.fury.io/js/react-native-validation.svg)](https://badge.fury.io/js/react-native-validation)

A simple validation library for react native

## Installation

Run: `$ npm i react-native-validation --save`

### Validators:
+ matchRegexp
+ isEmail
+ isEmpty
+ required
+ isNumber
+ isFloat
+ isPositive
+ maxNumber
+ minNumber
+ maxFloat
+ minFloat
+ isString
+ minStringLength
+ maxStringLength

Example Component:
````javascript
<ValidationComponent
  component={
    <RkTextInput
      rkType="bordered"
      style={{ width: "100%" }}
      placeholder="You can type a description"
      value={description}
      onChangeText={value => this.setState({ description: value })}
    />
  }
  validators={["required","maxNumber:255"]}
  errorMessages={["this field is required", "must be max 255"]}
/>
````

### Usage

````javascript
import { ValidationForm, ValidationComponent } from "react-native-validator";

constructor(props, context) {
  super(props, context);
  ValidationComponent.setDefaultErrorMessageStyle({
    color: "white",
    fontSize: 12,
  });
}

render() {   
    return (
      <ValidationForm
        style={style.container}
        ref={ref => (this.form = ref)}
        onSubmit={() => this.props.saveUserList()}
        onError={() => console.log("houston we have a problem")}
      >
        <ValidationComponent
          component={
            <RkTextInput
              rkType="bordered"
              style={{ width: "100%" }}
              placeholder="List Name"
              value={name}
              onChangeText={value => this.setState({ name: value.trim() })}
            />
          }
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <ValidationComponent
          component={
            <TextInput
              style={{ width: "100%" }}
              placeholder="You can type a description"
              value={description}
              onChangeText={value => this.setState({ description: value })}
            />
          }
          errorMessageStyle={{
            color: "red"
          }}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
        <RkButton rkType="primary xlarge" onPress={() => this.form.validate()}>
          Next
        </RkButton>
      </ValidationForm>
    );
}
...
````

#### You can add your own rules
````javascript
// validators={["isPasswordMatch:param1:param2"]}
ValidationForm.addValidationRule('isPasswordMatch', (value, param1, param2...) => {
    if (value !== this.state.user.password) {
        return false;
    }
    return true;
});
````

#### You can set default error style
````javascript
constructor(props, context) {
  super(props, context);
  ValidationComponent.setDefaultErrorMessageStyle({
    color: "white",
  });
}
````

### API

#### ValidationForm

+ Props

| Prop            | Required | Type     | Default value | Description                                                                                                                  |
|-----------------|----------|----------|---------------|-------------------------------------|
| onSubmit        | true     | function |               | triggered if form is valid          |
| onError         | false    | function |               | triggered if form is not valid      |

+ Methods

| Name             | Params | Return | Descriptipon                                       |
|------------------|--------|--------|----------------------------------------------------|
| validate         |        |        | Check form is valid                                |
| isValid          |        |  bool  | return current validation state                    |

#### ValidationComponent

+ Props

| Prop              | Required | Type     | Default value | Description                                                                            |
|-------------------|----------|----------|---------------|----------------------------------------------------------------------------------------|
| validators        | true     | array    |               | Array of validators.                                                                   |
| errorMessages     | true     | array    |               | Array of error messages. Must be in the same order as validation                       |
| errorMessageStyle | false    | object   |               | Error textComponent style                                                              |
| component         | true     | object   |               | Input component(Must include value prop)                                               |
| style             | false    | object   |               | Container style props                                                                  |

+ Methods

| Name                         | Params            | Return | Descriptipon                                                                         |
|------------------------------|-------------------|--------|--------------------------------------------------------------------------------------|
| setDefaultErrorMessageStyle  |   styleObject     |        | Set default style for error textComponent                                            |
