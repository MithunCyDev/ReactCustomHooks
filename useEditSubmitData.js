import { useEffect, useState } from "react";

const useEditSubmitData = () => {
  const [error, setError] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleRequest = async (url, method, data) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessAlert(true);
        return result;
      } else {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        setError(true);
        setSuccessAlert(false);
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error making request:", error);
      setError(true);
      setSuccessAlert(false);
      throw error;
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
      setSuccessAlert(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error, successAlert]);

  return { handleRequest, error, successAlert };
};

export default useEditSubmitData;
