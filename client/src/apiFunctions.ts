import api from './api.ts'; // import axios instance from api.tsx
import { DataType } from './types'; // Import DataType interface

// Function to fetch patient data from the back-end
const fetchPatientData = async (patientId: string, dataCategory: string): Promise<DataType> => {
    try {
        // Get the entire dataset including all categories
        const response = await api.get(`/patients/${patientId}/data`);
        // Get a specific category of the dataset
        // const response = await api.get(`/patients/${patientId}/${dataCategory}`);
        console.log("Data received from the backend:", response.data); // Log received data
        return response.data; // Return the data received from the server

    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching patient data:", error);
        throw error; // Rethrow the error for further handling
    }

};
export { fetchPatientData };// Export the fetchPatientData function for use in other files

// Function to fetch welcome message from the back-end
const fetchWelcomeMessage = async (): Promise<string> => {
    try {
        const response = await api.get(`/`); //get request for welcome message
        console.log("Data received from the backend:", response.data); // Log message
        return response.data; // Return welcome message
    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching welcome message:", error);
        throw error; // Rethrow the error for further handling
    }

};
export { fetchWelcomeMessage };// Export the fetchWelcomeMessage function
