import { appointmentStore } from "@/stores/appointmentStore";

export const appointmentComposable = () => {
  const appointment_store = appointmentStore();
  const { pastAppointments } = toRefs(appointment_store);
  const { nextAppointments } = toRefs(appointment_store);
  const { canceledAppointments } = toRefs(appointment_store);
  const { newAppointment } = toRefs(appointment_store);
  // const idInput = ref(0);
  // const dateTimeInput = ref(new Date());
  // const serviceInput = ref("");
  // const bayInput = ref("");
  // const brandInput = ref("");
  // const modelInput = ref("");
  // const yearInput = ref(0);
  // const statusInput = ref("");

  const fetchPastAppointments = async () => {
    await appointment_store.fetchPastAppointments();
  };
  const fetchNextAppointments = async () => {
    await appointment_store.fetchNextAppointments();
  };
  const fetchCanceledAppointments = async () => {
    await appointment_store.fetchCanceledAppointments();
  };

  // const editNextAppointmentData = (
  //   appt: { 
  //     id: number;
  //     dateTime: Date; 
  //     service: string;
  //     bay: string; 
  //     brand: string; 
  //     model: string; 
  //     year: number; 
  //     status: string;
  //   }) => {
  //   appt.dateTime = dateTimeInput.value;
  //   appt.service = serviceInput.value;
  //   appt.brand = brandInput.value;
  //   appt.model = modelInput.value;
  //   appt.year = yearInput.value;
  // };

  // const setInputToAppointmentData = (
  //   appt: { 
  //     id: number;
  //     dateTime: Date; 
  //     service: string;
  //     bay: string; 
  //     brand: string; 
  //     model: string; 
  //     year: number; 
  //     status: string;
  //   }) => {
  //   dateTimeInput.value = appt.dateTime;
  //   serviceInput.value = appt.service;
  //   brandInput.value = appt.brand;
  //   modelInput.value = appt.model;
  //   yearInput.value = appt.year;
  // };

  return {
    pastAppointments,
    nextAppointments,
    canceledAppointments,
    fetchPastAppointments,
    fetchNextAppointments,
    fetchCanceledAppointments,
    newAppointment
  };
}