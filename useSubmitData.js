import { useState } from "react";

const useSubmitData = (
  setSuccessAlert,
  setAlertMessage,
  handleReloadItem,
  setShow,
  filteredApiData,
  setSubmissionError,
  TableData
) => {
  const token = sessionStorage.getItem("userAccessToken");

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitData = async (url, data, somethingExit) => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      // If found exiting user Then return false
      if (filteredApiData && TableData) {
        filteredApiData.find((i) => i === TableData);
        localStorage.clear();
        setSubmissionError(true);
        return setShow(false);
      } else if (somethingExit) {
        setSubmissionError(true);
        return setShow(false);
      } else {
        setLoading(true);
        const response = await fetch(url, config);
        const responseData = await response.json();

        if (response.status === 200) {
          setResult(responseData);
          handleReloadItem(responseData);
          setSuccessAlert(true);
        } else {
          console.error("Server response:", responseData);
          throw new Error("Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      setAlertMessage("Error submitting data");
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  return { submitData, result, loading };
};

export default useSubmitData;
