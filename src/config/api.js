import axios from "axios"

const API = "https://693658c6f8dc350aff308a75.mockapi.io";

export const mockApi = axios.create({
  baseURL: API,
  timeout: 5000,
});
