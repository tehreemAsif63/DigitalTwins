import api from './api.ts'; // import axios instance from api.tsx
import { DataType } from './types'; // Import DataType interface

// Function to fetch patient data from the back-end
const fetchPatientData = async (patientId: string, dataCategory: string): Promise<DataType> => {
    //testing if data is tried to be fetched every 2 seconds- can remove later
    const startTime = Date.now();
    setInterval(() => {
        console.log(`Checking data is being fetched- ${Math.floor((Date.now() - startTime) / 1000)} seconds`);
    }, 1000);
    
    try {
        const response = await api.get(`/patients/${patientId}/${dataCategory}`);
        console.log("Data received from the backend:", response.data); // Log received data
        return response.data; // Return the data received from the server

    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching patient data:", error);
        throw error; // Rethrow the error for further handling
    }

};

// Export the fetchPatientData function for use in other files
export { fetchPatientData };

// Function to fetch welcome message from the back-end
const fetchWelcomeMessage = async (): Promise<string> => {
    console.log("Fetching welcome message..."); // Log fetching attempt
    try {
        const response = await api.get(`/api/v1`); //get request for welcome message
        console.log("Data received from the backend:", response.data); // Log message
        return response.data; // Return welcome message
    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching welcome message:", error);
        throw error; // Rethrow the error for further handling
    }

};

// Export the fetchWelcomeMessage function
export { fetchWelcomeMessage };
