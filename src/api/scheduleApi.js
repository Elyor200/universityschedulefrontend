import axiosClient from "./axiosClient";

const scheduleApi = {
    createSchedule: (data) => axiosClient.post(`/v1/schedule/create-schedule`, data),
    getAllSchedules: () => axiosClient.get(`/v1/schedule/getAllSchedules`),
    getAllSchedulesByRoomId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByRoomId/${id}`),
    getAllSchedulesByProfessorId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByProfessorId/${id}`),
    getAllSchedulesByDayOfWeek: (data) => axiosClient.get(`/v1/schedule/getAllSchedulesByDayOfWeek`, data),
    getAllSchedulesByCourseId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByCourseId/${id}`),
    deleteScheduleById: (id) => axiosClient.delete(`/v1/schedule/deleteScheduleById/${id}`),
}

export default scheduleApi