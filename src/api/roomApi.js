import axiosClient from "./axiosClient";

const roomApi = {
    createRoom: (data) => axiosClient.post("/v1/room/create", data),
    getById: (id) => axiosClient.get(`/v1/room/${id}`),
    getAllRooms: () => axiosClient.get(`/v1/room/getAllRooms`),
}

export default roomApi;