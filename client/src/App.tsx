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

    const rowData = [
        // Heart Rate Row
        {title: "HR", unit: "bpm", color: "lightgreen", data: visibleData.HR, optionPart: <FaHeart color="red" />, numberColor: "lightgreen"},
        // ABP Row 
        { title: "ABP", unit: "mmHg", color: "red", data: visibleData.ABP, optionPart: "120/80", numberColor: "white" },
        // Add more rows later
    ]

    return (
        <div className="grid grid-rows-2 gap-4 h-screen items-start bg-black">
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