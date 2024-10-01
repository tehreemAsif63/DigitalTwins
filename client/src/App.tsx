import React from "react";
import './App.css';
import RowComponent from "./components/RowComponents.tsx";
import {FaHeart} from 'react-icons/fa' // Import a heart icon from react-icons
import usePatientData from "./hooks/usePatientData.ts";


// The main component that renders different rows of data for a patient monitor.
// More specifically, it fetches data (e.g., ABP, heart rate, etc.) and displays them in separate rows using the RowComponent.
const App: React.FC = () => {
    const {visibleData, loading} = usePatientData();

    // Shows a loading message until the data has been populated
    if (loading) {
        return <div>Loading...</div> 
    }

    // An array of row objects, each representing a row of data type to be displayed.
    const rowData = [
        // Heart Rate Row
        {title: "HR", unit: "bpm", color: "lightgreen", data: visibleData.HR, optionPart: <FaHeart color="red" />, numberColor: "lightgreen"},
        // ABP Row 
        { title: "ABP", unit: "mmHg", color: "red", data: visibleData.ABP, optionPart: "120/80", numberColor: "white" },
        // Add more rows later
        { title: "test1", unit: "testunit", color: "lightblue", data: visibleData.ABP, numberColor: "lightblue" },
        { title: "test2", unit: "testunit", color: "green", data: visibleData.ABP, numberColor: "green" },
        { title: "test3", unit: "testunit", color: "green", data: visibleData.ABP, numberColor: "white" },
    ]

    return (
        // Grid layout that adjusts dynamically based on the content of the rowData.
        <div className="grid grid-cols-1 auto-rows-auto gap-2 overflow-auto h-screen bg-black">
            {rowData.map((row, index) => (
                <RowComponent
                    key={index}
                    title={row.title}
                    unit={row.unit}
                    color={row.color}
                    data={row.data}
                    optionPart={row.optionPart}
                    numberColor={row.numberColor}
                />
            )

        )}
        </div>
    );
};

export default App;