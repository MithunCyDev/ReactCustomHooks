//Use Delete data Hook for delete any items
const useDeleteData = (
  apiEndpoint, // API
  localStorageKeys, // pass localStorage Keys
  setApiData, // pass the setApiData function
  setReloadData, // pass the setReloadData function
  setError, // pass the setError function
  setDeleteData, // pass setDelete data for reload data
  setLoading
) => {
  const token = sessionStorage.getItem("userAccessToken");

  const handleDeleteClick = async () => {
    try {
      const selectedRow = localStorage.getItem(localStorageKeys[0]);

      if (selectedRow) {
        const rowData = JSON.parse(localStorage.getItem(localStorageKeys[1]));

        if (rowData && rowData.length > 0) {
          setLoading(true); // Set loading state before fetching

          // Delete each item asynchronously
          await Promise.all(
            rowData.map(async (item_id) => {
              const response = await fetch(`${apiEndpoint}/${item_id}`, {
                method: "DELETE",
                Authorization: `Bearer ${token}`,
              });

              if (response.ok) {
                // If response is successful, update state
                setApiData((prev) =>
                  prev.filter(
                    (i) =>
                      (i.email ||
                        i.purchase_order_number ||
                        i.sales_id ||
                        i.supplier_code ||
                        i.id) !== item_id
                  )
                );
                console.log(`Item with ID ${item_id} deleted successfully`);
                localStorage.clear();
              } else {
                // If response is not successful, throw an error
                throw new Error(`Failed to delete item with ID ${item_id}`);
              }
            })
          );

          // Clear local storage
          localStorage.clear();
          localStorage.removeItem(localStorageKeys[0]);
          localStorage.removeItem(localStorageKeys[1]);

          // Set deleteData state to trigger UI update
          setDeleteData(true);
        } else {
          setError(true); // Set error if no data found
        }
      } else {
        setError(true); // Set error if no selected row found
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(true); // Set error if any error occurs during deletion
    } finally {
      setLoading(false); // Ensure loading state is reset after deletion
    }
  };

  return { handleDeleteClick };
};

export default useDeleteData;
