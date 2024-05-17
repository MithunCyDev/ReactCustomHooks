import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedRow } from "../Redux/Slices/tableSelectedRow";

//Use Custom Select Item Hook(This hook will be start work when a user click on a dataGrid item)
const useHandleSelectItem = (keys) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();

  const handleSelectItem = (item, event) => {
    const target = event.target.checked;

    // Dispatch Selected Row Data
    dispatch(setSelectedRow(item));

    if (item !== null && item !== undefined) {
      if (target !== false) {
        const codeToStore = item.sales_id
          ? item.sales_id
          : item.purchase_order_number
          ? item.purchase_order_number
          : item.supplier_code
          ? item.supplier_code
          : item.email
          ? item.email
          : item.id;

        localStorage.setItem(keys[0], target !== undefined ? target : false);
        localStorage.setItem(keys[1], JSON.stringify(item));
        localStorage.setItem(keys[3], JSON.stringify(codeToStore));

        const selectedIndex = selectedRows.indexOf(codeToStore);
        let newSelected = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedRows, codeToStore);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
          newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedRows.slice(0, selectedIndex),
            selectedRows.slice(selectedIndex + 1)
          );
        }

        setSelectedRows(newSelected);
        localStorage.setItem(keys[2], JSON.stringify(newSelected));
      } else if (target === false && item !== null && item !== undefined) {
        // Clear localStorage data
        localStorage.clear();

        const codeToRemove = item.sales_id
          ? item.sales_id
          : item.purchase_order_number
          ? item.purchase_order_number
          : item.supplier_code
          ? item.supplier_code
          : item.email
          ? item.email
          : item.id;

        if (selectedRows.includes(codeToRemove)) {
          const updatedSelectedRows = selectedRows.filter(
            (id) => id !== codeToRemove
          );
          setSelectedRows(updatedSelectedRows);
          localStorage.setItem(keys[2], JSON.stringify(updatedSelectedRows));
        }
      }
    }
  };

  // Return the handler and selectedRows state
  return { handleSelectItem, selectedRows };
};

export default useHandleSelectItem;
