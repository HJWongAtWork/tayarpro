import { useVehicleStore } from "@/stores/vehicleStore";
import axios from "axios";

export const vehicleComposable = () => {
  const vehicle_store = useVehicleStore();
  const { vehicles } = toRefs(vehicle_store);
  const { cars } = toRefs(vehicle_store);
  const { selectedCar } = toRefs(vehicle_store);
  const idInput = ref(0);
  const plateNumberInput = ref("");
  const brandInput = ref("");
  const modelInput = ref("");
  const yearInput = ref(0);
  const tyreSizeInput = ref("");
  const typeInput = ref("");

  const fetchVehicles = async () => {
    await vehicle_store.fetchVehicles();
  };

  const getLatestVehicleId = () => {
    if (vehicles.value.length > 0) {
      return vehicles.value[vehicles.value.length - 1].id;
    }
    return 0;
  };

  const addVehicle = async () => {
    const newVehicle = {
      plate_number: plateNumberInput.value,
      car_brand: brandInput.value,
      car_model: modelInput.value,
      car_type: typeInput.value,
      car_year: Number(yearInput.value),
      tyre_size: tyreSizeInput.value,
    };

    const token = localStorage.getItem("jwt");

    try {
      const response = await axios.post("/api/add_new_car", newVehicle, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("Response from server:", response.data);
      fetchVehicles(); // Reload vehicles after successful addition
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        console.error("Axios error:", error.message);
        console.error("Response data:", error.response?.data); // Log the server's response if available
        console.error("Status code:", error.response?.status); // Log HTTP status code
      } else {
        // Non-Axios error
        console.error("Unknown error occurred:", error);
      }
    }
  };

  const editVehicle = async (id: number) => {
    const token = localStorage.getItem("jwt");
    const carData = {
      car_id: id,
      car_brand: brandInput.value,
      car_model: modelInput.value,
      car_type: typeInput.value,
      car_year: Number(yearInput.value),
      tyre_size: tyreSizeInput.value,
    };

    try {
      const response = await axios.put(
        "/api/update_car",
        carData, // Data to be sent with the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
            Accept: "application/json", // Accept JSON response
            "Content-Type": "application/json", // Content type is JSON
          },
        }
      );

      console.log("Response:", response.data); // Log the response from the server
    } catch (error) {
      console.error("Error updating car:", error); // Handle error
    }
    fetchVehicles();
  };

  const deleteVehicle = async (id: number) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        "/api/change_car_status",
        {
          car_id: id, // Data to be sent with the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
            Accept: "application/json", // Accept JSON response
            "Content-Type": "application/json", // Content type is JSON
          },
        }
      );

      console.log("Response:", response.data); // Log the response from the server
    } catch (error) {
      console.error("Error changing car status:", error); // Handle error
    }
    fetchVehicles();
  };

  return {
    vehicles,
    cars,
    selectedCar,
    idInput,
    plateNumberInput,
    brandInput,
    modelInput,
    yearInput,
    tyreSizeInput,
    typeInput,
    fetchVehicles,
    getLatestVehicleId,
    addVehicle,
    editVehicle,
    deleteVehicle,
  };
};
