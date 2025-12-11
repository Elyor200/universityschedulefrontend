import axiosClient from "./axiosClient";


const loginApi = {
    login: (email, password) => axiosClient.post(`/v1/auth/login`, {
        email,
        password
    })
}

export default loginApi;