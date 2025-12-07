import axiosClient from "./axiosClient";

const professorApi = {
    createProfessor: (data) => axiosClient.post(`/v1/professor/create-professor`, data),
    getProfessorById: (id) => axiosClient.get(`/v1/professor/getProfessorById/${id}`),
    getAllProfessors: () => axiosClient.get(`/v1/professor/getAllProfessors`),
}

export default professorApi