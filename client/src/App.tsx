import React, {useEffect, useState} from "react";
// This test_data folder with ABP data file is only used for testing plotting for now. It will be deleted later.
import testData from "./test_data/ABP,Syst,Numeric,Float,IntelliVue,data.json" 
import './App.css';
import RowComponent from "./components/RowComponents.tsx";
import {FaHeart} from 'react-icons/fa'

// Defines the structure of the data used for rendering the graph in the RowComponent.
interface DataType {
    time_vector: number[];
    measurement_data: number[];
}

// The main component that renders different rows of data for a patient monitor.
// More specifically, it fetches data (e.g., ABP, heart rate, etc.) and displays them in separate rows using the RowComponent.
const App: React.FC = () => {
    const [data, setData] = useState<DataType | null>(null);
    useEffect(() => {
        setData({
            time_vector: testData.time_vector.flat(),
            measurement_data: testData.measurement_data.flat()
        });
    }, [])
    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-rows-2 gap-4 h-screen items-start bg-black">
            {/* Heart Rate Row */}
            <RowComponent title="HR" unit="bpm" color="lightgreen" data={data} optionPart={<FaHeart color="red" />} numberColor="lightgreen"/>

            {/* ABP Row */}
            <RowComponent title="ABP" unit="mmHg" color="red" data={data} optionPart="120/80" numberColor="white"/>

            {/* Add more rows by reusing RowComponent */}
        </div>
    );
};

export default App;