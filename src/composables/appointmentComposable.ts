import { appointmentStore } from "@/stores/appointmentStore";

export const appointmentComposable = () => {
  const appointment_store = appointmentStore();
  const { pastAppointments } = toRefs(appointment_store);
  const { nextAppointments } = toRefs(appointment_store);
  const { canceledAppointments } = toRefs(appointment_store);
  const { newAppointment } = toRefs(appointment_store);
  const { allAppointments } = toRefs(appointment_store);

  const fetchAllAppointments = async () => {
    await appointment_store.fetchAllAppointments();
  };

  return {
    pastAppointments,
    nextAppointments,
    canceledAppointments,
    newAppointment,
    allAppointments,
    fetchAllAppointments,
  };
}