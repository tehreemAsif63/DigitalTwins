//axios to make  HTTP requests from a web browser
import axios from "axios";
console.log('API Endpoint:', process.env.REACT_APP_API_ENDPOINT);

//creates instance of axios with a predefined base URL
export default axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "https://localhost:5000/api/v1",
});
