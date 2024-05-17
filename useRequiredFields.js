import { useState } from "react";

// Control Form Require Fields and Alert or section
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

  const SnakeBarHandleClick = (newState) => () => {
    setState({ ...newState });
  };

  const SnakeBarHandleClose = () => {
    setState({ ...state, open: false });
  };

  const handleValidateFields = (requiredFields, formData) => {
    for (const field of requiredFields) {
      if (!formData[field]) {
        setAlert(true);
        setAlertMessage("All fields are required");
        setState({ ...state, open: true });
        return false;
      }
    }
    return true;
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
  };
};

export default useRequiredFields;
