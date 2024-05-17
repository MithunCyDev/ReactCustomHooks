import { useState, useEffect } from "react";

//Use Data Fetch Hook(This is the main hook for fetch API data)
const useFetchData = (url) => {
  const [apiData, setApiData] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("userAccessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET", // or 'POST', 'PUT', etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (!result) {
          console.error("Data is undefined");
          return;
        }

        setApiData(Array.from(result));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, reloadData, deleteData, token]);

  return {
    apiData,
    setApiData,
    reloadData,
    setReloadData,
    deleteData,
    setDeleteData,
    loading,
    setLoading,
  };
};

export default useFetchData;
