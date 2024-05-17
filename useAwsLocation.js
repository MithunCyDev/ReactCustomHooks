import { useCallback, useEffect, useState } from "react";
import AWS from "aws-sdk";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//AWS config
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: "us-east-1",
});

const locationService = new AWS.Location();

// AWS Location Service Hook(Fetch Specific Location)
const useAwsLocation = (
  address,
  setFormDataCallback,
  showBillingAddressList,
  showShippingAddressList
) => {
  const [addressAlert, setAddressAlert] = useState(false);
  const [addressAlertMessage, setAddressAlertMessage] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [shippingLocation, setShippingLocation] = useState([]);
  const [billingLocation, setBillingLocation] = useState([]);
  const [isLocation, setIsLocation] = useState(false);

  const fetchAddressDetails = useCallback(async () => {
    const params = {
      IndexName: "ERP",
      Text: address,
    };

    try {
      const result = await locationService
        .searchPlaceIndexForText(params)
        .promise();

      // console.log("AWS Location Service Result:", result);

      if (result && result.Results.length > 0) {
        const results = result.Results.map((res) => res.Place);
        // console.log(results, "address")
        setLocationResults(results);
        if (showBillingAddressList) {
          setBillingLocation(results);
          setIsLocation(true);
        } else if (showShippingAddressList) {
          setShippingLocation(results);
          setIsLocation(true);
        }
        setAddressAlert(false);

        // Use a separate object for address details to prevent dependency issues
      } else {
        setAddressAlertMessage("Address Not Found");
        setAddressAlert(true);
        setIsLocation(false);
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
      setAddressAlertMessage("Address Not Found");
      setAddressAlert(true);
    }
  }, [
    address,
    locationService,
    showBillingAddressList,
    showShippingAddressList,
  ]);

  // Fetch address details only when the address changes
  useEffect(() => {
    if (address) {
      fetchAddressDetails();
    }
  }, [address, fetchAddressDetails]);

  const handleSelectChange = (selectedAddress) => {
    const addressDetails = {
      city: selectedAddress.Municipality || "",
      state: selectedAddress.Region || "",
      country: selectedAddress.Country || "",
    };

    // Update address details
    setFormDataCallback((prevForm) => ({
      ...prevForm,
      ...addressDetails,
    }));
  };

  useEffect(() => {
    // Set the timeout
    const timeoutId = setTimeout(() => {
      setAddressAlert(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [addressAlert]);

  // console.log(locationResults, "result")
  return {
    addressAlert,
    setAddressAlert,
    addressAlertMessage,
    locationResults,
    shippingLocation,
    billingLocation,
    handleSelectChange,
    setIsLocation,
    isLocation,
  };
};

export default useAwsLocation;
