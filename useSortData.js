import { useState } from "react";

//Use Sorting Data Hook
const useSortData = (apiData, setApiData, sortProperty) => {
  const [sortAscending, setSortAscending] = useState(true);

  const sortDataAlphabetically = () => {
    const sortedData = [...apiData];

    // Define a toggle state for sorting order
    const newSortAscending = !sortAscending;

    sortedData.sort((a, b) => {
      return (
        a[sortProperty].localeCompare(b[sortProperty]) *
        (newSortAscending ? 1 : -1)
      );
    });

    setSortAscending(newSortAscending);
    setApiData(sortedData);
  };

  return { apiData, sortDataAlphabetically, sortAscending };
};

export default useSortData;
