import { useState } from "react";

const useAddressHandling = () => {
  const getAddressComponents = (newAddress) => {
    const addressComponents = [
      newAddress.Municipality,
      newAddress.SubRegion,
      newAddress.Neighborhood,
      newAddress.SubMunicipality,
    ].filter((component) => component);

    return addressComponents.length > 0
      ? addressComponents[0]
      : `${newAddress.SubRegion} ${newAddress.Region} ${newAddress.Country}`;
  };

  const handleAddressDropdown = (type, newAddress, setRecordForm) => {
    setRecordForm((prev) => ({
      ...prev,
      [`${type}_company_address`]: getAddressComponents(newAddress),
      [`${type}_country`]: newAddress.Country ? newAddress.Country : "",
      [`${type}_city`]: getAddressComponents(newAddress),
      [`${type}_state`]: newAddress.Region ? newAddress.Region : "",
    }));
  };

  return {
    handleAddressDropdown,
  };
};

export default useAddressHandling;
