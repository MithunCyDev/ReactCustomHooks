/**The useCheckboxHandler hook provides a simple yet effective way to manage checkbox states
 * in a React application with real-time updates and robust error handling. Integrate this
 * hook into application to enhance user experience while ensuring consistency
 * with backend data. *****************************************************************/

import { useRef, useCallback } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const useCheckboxHandler = (
  apiData,
  setApiData,
  reloadItem,
  url,
  dateFields = []
) => {
  // Track pending updates in a ref to avoid re-renders
  const pendingUpdatesRef = useRef([]);

  // Function to handle checkbox change
  const handleCheckboxChange = useCallback(
    (rowId, field, isChecked) => {
      const itemIndex = apiData.findIndex((item) => item.id === rowId);
      if (itemIndex !== -1) {
        // Optimistically update the UI
        const updatedItems = [...apiData];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          [field]: isChecked,
        };
        setApiData(updatedItems);

        // Prepare data for the API call
        const formDataSend = { ...updatedItems[itemIndex] };

        // Process date fields dynamically/only if you have any date fields
        if (dateFields) {
          dateFields.forEach((dateField) => {
            if (formDataSend[dateField]) {
              formDataSend[dateField] = new Date(formDataSend[dateField])
                .toISOString()
                .split("T")[0];
            }
          });
        }

        // Add this update to the ref's current array for tracking
        pendingUpdatesRef.current.push({
          rowId,
          formDataSend,
          field,
          isChecked,
        });

        // Process the pending update immediately
        processPendingUpdate(rowId, formDataSend, field, isChecked);
      }
    },
    [apiData, setApiData]
  );

  // Function to process each pending update
  const processPendingUpdate = useCallback(
    (rowId, formDataSend, field, isChecked) => {
      axios
        .put(`${url}/${rowId}`, formDataSend)
        .then((response) => {
          enqueueSnackbar(
            `${field.toUpperCase()} checkbox updated successfully!`,
            {
              variant: "success",
            }
          );
          if (reloadItem) reloadItem(response.data); // Optionally reload data
        })
        .catch((error) => {
          console.error(
            `Error updating ${field} for item with ID ${rowId}`,
            error
          );
          enqueueSnackbar(`Error updating the checkbox for ${field}`, {
            variant: "error",
          });

          // Revert the change in case of error
          setApiData((prevData) => {
            const revertedData = [...prevData];
            const revertedIndex = revertedData.findIndex(
              (item) => item.id === rowId
            );
            if (revertedIndex !== -1) {
              revertedData[revertedIndex][field] = !isChecked;
            }
            return revertedData;
          });
        })
        .finally(() => {
          // Remove the processed update from the pending list
          pendingUpdatesRef.current = pendingUpdatesRef.current.filter(
            (update) => update.rowId !== rowId || update.field !== field
          );
        });
    },
    [setApiData, reloadItem]
  );

  return handleCheckboxChange;
};

export default useCheckboxHandler;

//UseCase//

// /* Handle checkbox change Use the custom hook to handle checkbox changes*****/
//   /* set handleCheckboxChange as a handler function in your checkBox*****/
//   const url = "Api_url_will_be_here";
//   const dateFields = ["po_date", "delivery_date"]; // if you have any date field then pass these
//   const handleCheckboxChange = useCheckboxHandler(
//     apiData,
//     setApiData,
//     handleReloadEditItem,
//     url,
//     dateFields
//   );
