import React, {useEffect, useState} from "react";
import { fetchPatientData } from "./apiFunctions.ts"; // Import the fetch function
import './App.css';
import RowComponent from "./components/RowComponents.tsx";
import {FaHeart} from 'react-icons/fa' // Import a heart icon from react-icons
import {Api} from "./api.tsx"; // import configured Axios instance
import { DataType } from './types.ts'; // Import DataType interface


// The main component that renders different rows of data for a patient monitor.
// More specifically, it fetches data (e.g., ABP, heart rate, etc.) and displays them in separate rows using the RowComponent.
const App: React.FC = () => {
    //The initial state is set to null, and the state is set up to store patient data, which can be of any specific data type or null.
    const [data, setData] = useState<DataType | null>(null);
    const patientId = "123"; // Placeholder-Replace with the actual patient ID
    const dataCategory = "abp"; // Placeholder-Replace with the actual data category

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch patient data using the defined function
                const patientData = await fetchPatientData(patientId, dataCategory);
                console.log("Fetched Patient Data:", patientData); // Log the fetched data

                setData({
                    time_vector: patientData.time_vector, // data structure
                    measurement_data: patientData.measurement_data,
                });
            } catch (error) {
                console.error("Failed to fetch patient data:", error);
            }
        };

        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 2 seconds
        const intervalId = setInterval(fetchData, 2000);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [patientId, dataCategory]);

    if (!data) { //while data is not loaded display this message
        return <div>Loading...</div>;
    }

    return (// two rowComponents for now showcasing two categories' measurements
        <div className="grid grid-rows-2 gap-4 h-screen items-start bg-black">
            <RowComponent title="HR" unit="bpm" color="lightgreen" data={data} optionPart={<FaHeart color="red" />} numberColor="lightgreen"/>
            <RowComponent title="ABP" unit="mmHg" color="white" data={data} optionPart="120/80" numberColor="white"/>
        </div>
    );
};

export default App;