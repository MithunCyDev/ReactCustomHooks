import { useState, useEffect } from "react";

// Generate Unique Random Number
const useRandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    function generateUniqueRandomNumber() {
      let uniqueNumbers = new Set();
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 900000) + 100000;
      } while (uniqueNumbers.has(randomNumber));
      uniqueNumbers.add(randomNumber);
      return randomNumber;
    }
    setRandomNumber(generateUniqueRandomNumber());
  }, []);

  return randomNumber;
};

export default useRandomNumber;
