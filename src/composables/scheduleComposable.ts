import { scheduleStore } from "@/stores/scheduleStore";

export const scheduleComposable = () => {
  const schedule_store = scheduleStore();
  const { schedule } = toRefs(schedule_store);

  const initializeSchedule = async () => {
    await schedule_store.initializeSchedule();
  };

  return {
    schedule,
    initializeSchedule
  };
}