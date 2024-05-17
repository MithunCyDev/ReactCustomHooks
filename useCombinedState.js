import { useState } from "react";

// Custom hook to manage combined state
const useCombinedState = () => {
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);

  // Combine the four state variables into a single object
  const combinedState = {
    state1: state1,
    state2: state2,
    state3: state3,
    state4: state4,
  };

  // Function to update individual boolean states
  const setUpdateState = (stateName, value) => {
    switch (stateName) {
      case "state1":
        setState1(value);
        break;
      case "state2":
        setState2(value);
        break;
      case "state3":
        setState3(value);
        break;
      case "state4":
        setState4(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setState1(false);
    setState2(false);
    setState3(false);
    setState4(false);
  };

  return [combinedState, setUpdateState, reset];
};

export { useCombinedState };
