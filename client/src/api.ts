//axios to make  HTTP requests from a web browser
import axios from "axios";

//creates instance of axios with a predefined base URL
export default axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "https://localhost:5000/api/v1",
  headers: {'Content-Type': 'application/json',},
});
