import axios from "axios";


export const axiosInstanse = axios.create({
    baseURL: `http://localhost:${8080}/api/`,
    timeout: 5000,
    timeoutErrorMessage: "Somthing went wrong"
})