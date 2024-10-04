import React, {useEffect, useState} from "react";
import { fetchPatientData , fetchWelcomeMessage} from "./apiFunctions.ts"; // Import the fetch function
import './App.css';
import RowComponent from "./components/RowComponents.tsx";
import {FaHeart} from 'react-icons/fa' // Import a heart icon from react-icons
import { DataType } from './types.ts'; // Import DataType interface


// The main component that renders different rows of data for a patient monitor.
// More specifically, it fetches data (e.g., ABP, heart rate, etc.) and displays them in separate rows using the RowComponent.
const App: React.FC = () => {
    //The initial state is set to null, and the state is set up to store patient data, which can be of any specific data type or null.
    const [data, setData] = useState<DataType | null>(null);
    const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
    const patientId = "1"; // Placeholder-Replace with the actual patient ID
    const dataCategory = "measurement_data"; // Placeholder-Replace with the actual data category

    useEffect(() => {
        // Fetch the welcome message
        const fetchInitialData = async () => {
            try {
                const message = await fetchWelcomeMessage();
                setWelcomeMessage(message); // Set the welcome message state
                console.log("Here is the welcome message!");
            } catch (error) {
                console.error("Failed to fetch welcome message:", error);
            }
        };

        //fetch patient data
        const fetchData = async () => {
            try {
                // Fetch patient data using the defined function
                const patientData = await fetchPatientData(patientId, dataCategory);
                console.log("Fetched Patient Data:", patientData.data); // Log the fetched data

                setData({
                    time_vector: patientData.data.time_vector.flat(), // data structure
                    measurement_data: patientData.data.measurement_data.flat(),
                });
            } catch (error) {
                console.error("Failed to fetch patient data:", error);
            }
        };

        fetchInitialData(); // Fetch the welcome message
        fetchData();  // Fetch patient data

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
            <h1 style={{ color: "white" }}>{welcomeMessage}</h1> {/* Display the welcome message */}

            <RowComponent title="HR" unit="bpm" color="lightgreen" data={data} optionPart={<FaHeart color="red" />} numberColor="lightgreen"/>
            <RowComponent title="ABP" unit="mmHg" color="white" data={data} optionPart="120/80" numberColor="white"/>
        </div>
    );
};

export default App;