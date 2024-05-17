// useFetchUsers.js
import { useState, useEffect } from "react";
import axios from "axios";

const getAllUserData = async (url, headers, accumulatedData = []) => {
  try {
    const response = await axios.get(url, { headers });
    accumulatedData = [...accumulatedData, ...response.data.value];
    if (response.data["@odata.nextLink"]) {
      return getAllUserData(
        response.data["@odata.nextLink"],
        headers,
        accumulatedData
      );
    } else {
      return accumulatedData;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const useFetchUsersData = (url, presidentEmail = "") => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    const token = window.sessionStorage.getItem("userAccessToken");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await getAllUserData(url, headers);

      // Filter employees to find the president
      const president = response.filter((item) => item.mail === presidentEmail);

      // Filter employees to find those with non-null mail and defined manager
      let result = response.filter(
        (element) =>
          element.mail !== null && typeof element.manager !== "undefined"
      );

      // Merge president with filtered employees
      result = president.concat(result);

      setUserList(result);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [url]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  return { userList, loading, error };
};

export default useFetchUsersData;
