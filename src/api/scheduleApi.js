import axiosClient from "./axiosClient";
import studentApi from "./studentApi";

const scheduleApi = {
    createSchedule: (data) => axiosClient.post(`/v1/schedule/create-schedule`, data),
    getAllSchedules: () => axiosClient.get(`/v1/schedule/getAllSchedules`),
    getAllSchedulesByRoomId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByRoomId/${id}`),
    getAllSchedulesByProfessorId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByProfessorId`, {
        params: {
            professorId: id,
        }
    }),
    getAllSchedulesByDayOfWeek: (data) => axiosClient.get(`/v1/schedule/getAllSchedulesByDayOfWeek`, data),
    getAllSchedulesByCourseId: (id) => axiosClient.get(`/v1/schedule/getAllSchedulesByCourseId/${id}`),
    deleteScheduleById: (id) => axiosClient.delete(`/v1/schedule/deleteScheduleById/${id}`),
    getAllSchedulesByStudentId: (studentId) => axiosClient.get(`v1/schedule/getAllSchedulesByStudentId`, {
        params: {
            studentId: studentId
        }
    })
}

export default scheduleApi