import { vehicleStore } from "@/stores/vehicleStore";

export const vehicleComposable = () => {
  const vehicle_store = vehicleStore();
  const { vehicles } = toRefs(vehicle_store);
  const idInput = ref(0);
  const plateNumberInput = ref("");
  const brandInput = ref("");
  const modelInput = ref("");
  const yearInput = ref(0);

  const fetchVehicles = async () => {
    await vehicle_store.fetchVehicles();
  };

  const getLatestVehicleId = () => {
    if (vehicles.value.length > 0) {
      return vehicles.value[vehicles.value.length - 1].id;
    }
    return 0;
  }

  const addVehicle = () => {
    const newVehicle = {
      id: getLatestVehicleId() + 1,
      plateNumber: plateNumberInput.value,
      brand: brandInput.value,
      model: modelInput.value,
      year: yearInput.value
    };
    vehicles.value.push(newVehicle);
  };

  const editVehicle = (id: number) => {
    const index = vehicles.value.findIndex(vehicle => vehicle.id === id);
    if (index !== -1) {
      vehicles.value[index].plateNumber = plateNumberInput.value;
      vehicles.value[index].brand = brandInput.value;
      vehicles.value[index].model = modelInput.value;
      vehicles.value[index].year = yearInput.value;
    }
  };

  const deleteVehicle = (id: number) => {
    const index = vehicles.value.findIndex(vehicle => vehicle.id === id);
    if (index !== -1) {
      vehicles.value.splice(index, 1);
    }
  };  

  return {
    vehicles,
    idInput,
    plateNumberInput,
    brandInput,
    modelInput,
    yearInput,
    fetchVehicles,
    getLatestVehicleId,
    addVehicle,
    editVehicle,
    deleteVehicle
  };
}