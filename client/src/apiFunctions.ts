import { Api } from './api'; // import axios instance from api.tsx
// This test_data folder with ABP data file is only used for testing for now. It will be deleted later.
import testData from "./test_data/ABP,Syst,Numeric,Float,IntelliVue,data.json" 
import { DataType } from './types'; // Import DataType interface

// Function to fetch patient data from the back-end
const fetchPatientData = async (patientId: string, dataCategory: string) => {
    try {
        // Simulate fetching data from the backend using test data for now
        // You can comment out this block when backend is connected
        const simulatedData = new Promise<DataType>((resolve) => { //Specify the promise type
            setTimeout(() => {
                resolve({
                    time_vector: testData.time_vector.flat(), 
                    measurement_data: testData.measurement_data.flat(),
                });
            }, 2000); // Simulates a 2-second delay
        });

        // Uncomment the following lines when the backend is connected
        // const response = await Api.get(`/patients/${patientId}/${dataCategory}`);
        // return response.data; // Return the data received from the server

        return simulatedData; // Return the simulated data

    } catch (error) {
        // Log an error message if the request fails
        console.error("Error fetching patient data:", error);
        throw error; // Rethrow the error for further handling
    }
};

// Export the fetchPatientData function for use in other files
export { fetchPatientData };