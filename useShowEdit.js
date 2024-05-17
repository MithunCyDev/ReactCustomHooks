import { useState } from "react";

//useEditData Hook
const useShowEdit = (EditItemLocalStorageKeys, setError) => {
  const [editItem, setEditItem] = useState(false);

  const editData = () => {
    const rowData = JSON.parse(
      localStorage.getItem(EditItemLocalStorageKeys[0])
    );
    const tableData = JSON.parse(
      localStorage.getItem(EditItemLocalStorageKeys[1])
    );

    if (tableData && rowData && rowData.length > 0) {
      setEditItem(true);
      setError(false);
    } else {
      setEditItem(false);
      setError(true);
    }
  };

  return { editData, editItem, setEditItem };
};

export default useShowEdit;
