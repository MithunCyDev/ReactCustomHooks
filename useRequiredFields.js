import { useState } from "react";

const useRequiredFields = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // SnakeBar alert
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const [fieldErrors, setFieldErrors] = useState({}); // Track fields with errors

  const SnakeBarHandleClick = (newState) => () => {
    setState({ ...newState });
  };

  const SnakeBarHandleClose = () => {
    setState({ ...state, open: false });
  };

  const handleValidateFields = (requiredFields, formData,) => {
    let hasError = false;
    const errors = {};

    // Validate each required field
    for (const field of requiredFields) {
      if (!formData[field]) {
        errors[field] = true; // Mark field with an error
        hasError = true;
      }
    }

    if (hasError) {
      setAlert(true);
      setAlertMessage("Please fill out all required fields");
      setState({ ...state, open: true });
      setFieldErrors(errors); // Set fields with errors
      return false;
    } else {
      setFieldErrors({}); // Reset errors if no missing fields
      return true;
    }
  };

  return {
    handleValidateFields,
    alert,
    alertMessage,
    setAlertMessage,
    state,
    setState,
    vertical,
    horizontal,
    open,
    SnakeBarHandleClick,
    SnakeBarHandleClose,
    fieldErrors, // Expose the error state
    setFieldErrors,
  };
};

export default useRequiredFields;
