import axiosClient from "./axiosClient";
import {data} from "react-router-dom";

const courseApi = {
    createCourse: (data) => axiosClient.post(`/v1/course/create-course`, data),
    getCourseById: (id) => axiosClient.get(`/v1/course/getCourseById/${id}`),
    getAllCourses: () => axiosClient.get(`/v1/course/getAllCourses`),
    getAllEnrolledCoursesByStudentId: (studentId) => axiosClient.get(`/v1/course/getEnrolledCoursesByStudentId`, {
        params: {
            studentId: studentId,
        }
    }),
    getAllCoursesByProfessor: (id, email) => axiosClient.get(`/v1/course/getAllCoursesByProfessorIdAndEmail`, {
        params: {
            professorId: id,
            email: email,
        }
    }),

    enrollToCourse: (data) => axiosClient.post(`/v1/course/enroll-to-course`, data),
}

export default courseApi;