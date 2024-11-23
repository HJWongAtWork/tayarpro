import { defineStore } from 'pinia';
import axios from 'axios';

export const appointmentStore = defineStore('appointmentStore', {
  state: () => ({
    allAppointments: [] as {
      status: string;
      appointmentid: string;
      accountid: string;
      carid: number;
      createdat: string;
      appointmentdate: string;
      appointment_bay: string;
    }[],
    pastAppointments: [] as {
      id: number;
      dateTime: Date;
      service: string;
      bay: number;
      brand: string;
      model: string;
      year: number;
      status: string;
    }[],
    nextAppointments: [] as {
      id: number;
      dateTime: Date;
      service: string;
      bay: number;
      brand: string;
      model: string;
      year: number;
      status: string;
    }[],
    canceledAppointments: [] as {
      id: number;
      dateTime: Date;
      service: string;
      bay: number;
      brand: string;
      model: string;
      year: number;
      status: string;
    }[],
    newAppointment: {
      id: -1,
      dateTime: new Date(),
      bay: -1,
      carid: -1,
    },
  }),
  getters: {
    getPastAppointments: (state) => state.pastAppointments,
    getNextAppointments: (state) => state.nextAppointments,
    getCanceledAppointments: (state) => state.canceledAppointments,
    getNewAppointment: (state) => state.newAppointment,
    getAllAppointments: (state) => state.allAppointments,
  },
  actions: {
    async fetchAllAppointments() {
      const appts = [
        { appointmentid: "1", appointmentdate: "2024-12-02T09:00:00", appointment_bay: "1", status: "Future", carid: 42, createdat: "abc1234567", accountid: "xyz7890123" },
        { appointmentid: "2", appointmentdate: "2024-12-02T10:00:00", appointment_bay: "2", status: "Future", carid: 76, createdat: "def4567890", accountid: "uvw5678901" },
        { appointmentid: "3", appointmentdate: "2024-12-02T11:00:00", appointment_bay: "3", status: "Future", carid: 18, createdat: "ghi1234567", accountid: "rst8901234" },
        { appointmentid: "4", appointmentdate: "2024-12-02T12:00:00", appointment_bay: "1", status: "Future", carid: 55, createdat: "jkl2345678", accountid: "opq3456789" },
        { appointmentid: "5", appointmentdate: "2024-12-02T13:00:00", appointment_bay: "4", status: "Future", carid: 24, createdat: "mno3456789", accountid: "lmn4567890" },
        { appointmentid: "6", appointmentdate: "2024-12-02T14:00:00", appointment_bay: "2", status: "Future", carid: 67, createdat: "pqr1234567", accountid: "ijk1234567" },
        { appointmentid: "7", appointmentdate: "2024-12-02T15:00:00", appointment_bay: "5", status: "Future", carid: 33, createdat: "stu4567890", accountid: "ghi7890123" },
        { appointmentid: "8", appointmentdate: "2024-12-02T16:00:00", appointment_bay: "3", status: "Future", carid: 89, createdat: "vwx1234567", accountid: "def8901234" },
        { appointmentid: "9", appointmentdate: "2024-12-02T17:00:00", appointment_bay: "1", status: "Future", carid: 12, createdat: "yz01234567", accountid: "abc5678901" },
        { appointmentid: "10", appointmentdate: "2024-12-02T15:00:00", appointment_bay: "2", status: "Future", carid: 61, createdat: "rst3456789", accountid: "uvw3456789" },
        { appointmentid: "11", appointmentdate: "2024-12-02T10:00:00", appointment_bay: "1", status: "Future", carid: 74, createdat: "opq7890123", accountid: "lmn8901234" },
        { appointmentid: "12", appointmentdate: "2024-12-02T11:00:00", appointment_bay: "1", status: "Future", carid: 43, createdat: "ijk4567890", accountid: "rst5678901" },
        { appointmentid: "13", appointmentdate: "2024-12-02T13:00:00", appointment_bay: "1", status: "Future", carid: 91, createdat: "ghi8901234", accountid: "opq1234567" },
        { appointmentid: "14", appointmentdate: "2024-12-02T14:00:00", appointment_bay: "1", status: "Future", carid: 22, createdat: "def5678901", accountid: "ijk3456789" },
        { appointmentid: "15", appointmentdate: "2024-12-02T15:00:00", appointment_bay: "1", status: "Future", carid: 39, createdat: "abc8901234", accountid: "ghi4567890" },
        { appointmentid: "16", appointmentdate: "2024-12-02T16:00:00", appointment_bay: "1", status: "Future", carid: 50, createdat: "lmn1234567", accountid: "def2345678" },
        { appointmentid: "17", appointmentdate: "2024-12-02T09:00:00", appointment_bay: "4", status: "Future", carid: 6, createdat: "rst8901234", accountid: "abc5678901" },
        { appointmentid: "18", appointmentdate: "2024-12-02T10:00:00", appointment_bay: "4", status: "Future", carid: 94, createdat: "opq2345678", accountid: "ijk8901234" },
        { appointmentid: "19", appointmentdate: "2024-12-02T11:00:00", appointment_bay: "4", status: "Future", carid: 13, createdat: "ghi3456789", accountid: "rst5678901" },
        { appointmentid: "20", appointmentdate: "2024-12-02T12:00:00", appointment_bay: "4", status: "Future", carid: 77, createdat: "def4567890", accountid: "uvw1234567" },
        { appointmentid: "21", appointmentdate: "2024-12-02T14:00:00", appointment_bay: "4", status: "Future", carid: 4, createdat: "abc1234567", accountid: "xyz3456789" },
        { appointmentid: "22", appointmentdate: "2024-12-02T15:00:00", appointment_bay: "4", status: "Future", carid: 97, createdat: "lmn4567890", accountid: "rst7890123" },
        { appointmentid: "23", appointmentdate: "2024-12-02T16:00:00", appointment_bay: "4", status: "Future", carid: 20, createdat: "ijk3456789", accountid: "ghi8901234" },
        { appointmentid: "24", appointmentdate: "2024-12-02T17:00:00", appointment_bay: "4", status: "Future", carid: 31, createdat: "abc5678901", accountid: "def1234567" },
      ];

      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      this.allAppointments.splice(0, this.allAppointments.length);
      // this.allAppointments.push(...appts);
      appts.forEach((item) => this.allAppointments.push(
        {
          status: item.status,
          appointmentid: item.appointmentid,
          accountid: item.accountid,
          carid: item.carid,
          createdat: item.createdat,
          appointmentdate: item.appointmentdate,
          appointment_bay: item.appointment_bay
        }
      ));

      try {
        const response = await axios.post(`${baseUrl}/all_appointments`, {}, {
          headers: {
            Accept: "application/json",
          },
        });

        this.allAppointments = [
          ...this.allAppointments,
          ...response.data.map((item: any) => ({
            status: item.status,
            appointmentid: item.appointmentid,
            accountid: item.accountid,
            carid: item.carid,
            createdat: item.createdat,
            appointmentdate: item.appointmentdate,
            appointment_bay: item.appointment_bay
          })),
        ];
        //console.log("All Appointments: ", this.allAppointments);
      } catch (error) {
        console.error("Error fetching all appointments: ", error);
      }
    },
  },
});
