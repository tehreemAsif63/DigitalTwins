//axios to make  HTTP requests from a web browser
import axios from "axios";

//creates instance of axios with a predefined base URL
export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || "http://localhost:3000/api/v1",
  headers: {'Content-Type': 'application/json',},
});
