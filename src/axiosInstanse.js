import axios from "axios";

const port = 3001

export const axiosInstanse = axios.create({
    baseURL:`http://localhost:${port}/api/`,
    timeout:5000,
    timeoutErrorMessage:"Somthing went wrong"
})