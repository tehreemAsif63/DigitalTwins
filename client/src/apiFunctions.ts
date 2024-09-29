import { Api } from './api'; // import axios instance from api.tsx
import { DataType } from './types'; // Import DataType interface

// Function to fetch patient data from the back-end
const fetchPatientData = async (patientId: string, dataCategory: string): Promise<DataType> => {

    try {
        const response = await Api.get(`/patients/${patientId}/${dataCategory}`);
        return response.data; // Return the data received from the server
        console.log("Data received from the backend:", response.data); // Log received data

    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching patient data:", error);
        throw error; // Rethrow the error for further handling
    }

};

// Export the fetchPatientData function for use in other files
export { fetchPatientData };