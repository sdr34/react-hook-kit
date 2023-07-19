# React Hook Kit

[![NPM version](https://img.shields.io/npm/v/react-custom-hooks.svg?style=flat)](https://www.npmjs.com/package/react-hook-kit)
[![Open Issues](https://img.shields.io/github/issues/your-github-username/react-hook-kit.svg?style=flat)](https://github.com/sdr34/react-hook-kit/issues)
[![Contributors](https://img.shields.io/github/contributors/sdr34/react-hook-kit.svg?style=flat)](https://github.com/sdr34/react-hook-kit/graphs/contributors)
[![License](https://img.shields.io/github/license/sdr34/react-hook-kit.svg?style=flat)](https://github.com/sdr34/react-hook-kit/LICENSE)

React Hook Kit is a library of custom React hooks written in TypeScript. It includes common and useful hooks like useForm, useFetch, useLocalStorage, and others, simplifying and accelerating the development process.

## Installation

```bash
npm install react-hook-kit
```

## Available Hooks

useForm: A hook for handling form state and validation.

## Usage

useForm

The useForm hook allows you to manage form state and handle form input changes easily. It takes an initial form state object as an argument and returns an object with the current form state, a function to handle input changes, and a function to reset the form.

Example usage:

```jsx
import React from "react";
import useForm from "react-hook-kit";

const MyForm = () => {
  const { formState, handleChange, resetForm } = useForm({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};

export default MyForm;
```

In the example above, the useForm hook is used to manage the form state with two fields: name and email. The handleChange function updates the form state on input changes, and the resetForm function resets the form back to its initial state.

For more information and examples of other available hooks, please refer to the documentation.

## Contributing

Contributions are welcome! If you have any ideas, improvements, or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
