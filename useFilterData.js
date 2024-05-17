import { useState, useEffect, useMemo } from "react";

const useFilteredData = (apiData, property) => {
  const [filterApiData, setFilterApiData] = useState([]);

  useMemo(() => {
    const filteredData = apiData.filter((item) => {
      return (
        item[property] === "active" ||
        item[property] === "Active" ||
        item[property] === "inactive" ||
        item[property] === "Inactive" ||
        item[property] === "Pending" ||
        item[property] === "pending" ||
        item[property] === "draft" ||
        item[property] === "Draft" ||
        item[property] === "Approved" ||
        item[property] === "new" ||
        item[property] === "duplicate"
      );
    });
    setFilterApiData(filteredData);
  }, [apiData, property]);

  return filterApiData;
};

export default useFilteredData;
