import axiosClient from "./axiosClient";

const studentApi = {
    register: (data) => axiosClient.post("/v1/student/register", data),
    getById: (id) => axiosClient.get(`/v1/student/${id}`),
    getAll: () => axiosClient.get(`/v1/student/getAllStudents`),
}

export default studentApi;