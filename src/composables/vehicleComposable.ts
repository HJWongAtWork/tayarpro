import { vehicleStore } from "@/stores/vehicleStore";

export const vehicleComposable = () => {
  const vehicle_store = vehicleStore();
  const { vehicles } = toRefs(vehicle_store);
  const idInput = ref(0);
  const plateNumberInput = ref("");

  const fetchVehicles = async () => {
    await vehicle_store.fetchVehicles();
  };

  // const editVehicleData = () => {
  //   vehicles.value[0].plateNumber = plateNumberInput.value;
  // };

  // const setInputToVehicleData = () => {
  //   plateNumberInput.value = vehicles.value[0].plateNumber;
  // };

  return {
    vehicles,
    idInput,
    plateNumberInput,
    fetchVehicles,
    // editVehicleData,
    // setInputToVehicleData
  };
}