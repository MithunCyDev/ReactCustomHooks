import { useState } from "react";

export const useFilterAndSortData = (data, defaultAscending = true) => {
  const [searchValue1, setsetSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [ascending, setAscending] = useState(defaultAscending);

  const filterAndSortData = (NameExtractor, statusExtractor) => {
    let filteredData = data.filter((item) => {
      const nameMatch =
        searchValue1 &&
        NameExtractor(item).toLowerCase().includes(searchValue1.toLowerCase());
      const statusMatch =
        searchValue2 &&
        statusExtractor(item).toLowerCase() === searchValue2.toLowerCase();

      return nameMatch && statusMatch;
    });

    if (ascending) {
      filteredData.sort((a, b) =>
        NameExtractor(a).localeCompare(NameExtractor(b))
      );
    } else {
      filteredData.sort((a, b) =>
        NameExtractor(b).localeCompare(NameExtractor(a))
      );
    }

    return filteredData;
  };

  return {
    searchValue1,
    setsetSearchValue1,
    searchValue2,
    setSearchValue2,
    ascending,
    setAscending,
    filterAndSortData,
  };
};
