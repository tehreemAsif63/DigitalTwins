import React, {useEffect, useState} from "react";
// This test_data folder with ABP and HR data files is only used for testing plotting for now. It will be deleted later.
import abpTestData from "./test_data/ABP,Syst,Numeric,Float,IntelliVue,data.json" 
import hrTestData from "./test_data/HR,na,Numeric,Float,IntelliVue,data.json"
import './App.css';
import RowComponent from "./components/RowComponents.tsx";
import {FaHeart} from 'react-icons/fa' // Import a heart icon from react-icons

// Defines the structure of the data used for rendering the graph in the RowComponent.
interface DataType {
    time_vector: number[];
    measurement_data: number[];
}

// Defines the general structure for the data contains different patient measurement data
interface AllDataType {
    ABP: DataType,
    HR: DataType
}

// The main component that renders different rows of data for a patient monitor.
// More specifically, it fetches data (e.g., ABP, heart rate, etc.) and displays them in separate rows using the RowComponent.
const App: React.FC = () => {
    // Initializes the state for visualizing different measurement data of a patient, only ABP and HR for now
    const [visibleData, setVisibleData] = useState<AllDataType>({
        ABP: {time_vector: [], measurement_data: []},
        HR: {time_vector: [], measurement_data: []}
    });

    // Initializes the state for tracking the current index in the dataset
    const [currentIndex, setCurrentIndex] = useState(0);  

    const intervalTime = 800; // Time interval for data updates
    const chunkSize = 20; // Number of data points to fetch per update

    useEffect(() => {
        // Flatten the arrays
        const timeVectorABP = abpTestData.time_vector.flat();
        const measurementDataABP = abpTestData.measurement_data.flat();
        const timeVectorHR = hrTestData.time_vector.flat();
        const measurementDataHR = hrTestData.measurement_data.flat();

        // Updates the visibleData
        const updateData = () => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + chunkSize;

                if (nextIndex >= timeVectorABP.length) {
                    // Reset when data runs out
                    return 0;
                } else {
                    setVisibleData((prevData) => {
                        // update ABP data
                        // concatenate the new data to the old ones to update the updatedTimeVector
                        const updatedTimeVectorABP = [
                            ...prevData.ABP.time_vector,
                            ...timeVectorABP.slice(prevIndex, nextIndex)
                        ];
                        // concatenate the new data to the old ones to update the updatedMeasurementData
                        const updatedMeasurementDataABP = [
                            ...prevData.ABP.measurement_data,
                            ...measurementDataABP.slice(prevIndex, nextIndex)
                        ];

                        // update HR data
                        const updatedTimeVectorHR = [
                            ...prevData.HR.time_vector,
                            ...timeVectorHR.slice(prevIndex, nextIndex)
                        ];
                        // concatenate the new data to the old ones to update the updatedMeasurementData
                        const updatedMeasurementDataHR = [
                            ...prevData.HR.measurement_data,
                            ...measurementDataHR.slice(prevIndex, nextIndex)
                        ];

                        // Returns the updated state for visibleData and only shows the last 200 data points
                        // to simulate a sliding effect
                        return {
                            ABP: {
                                time_vector: updatedTimeVectorABP.slice(-200),
                                measurement_data: updatedMeasurementDataABP.slice(-200)
                            },
                            HR: {
                                time_vector: updatedTimeVectorHR.slice(-200),
                                measurement_data: updatedMeasurementDataHR.slice(-200)
                            }
                        };
                    });

                    return nextIndex; // Updates currentIndex to the next index
                }
            });
        };
        
        const intervalId = setInterval(updateData, intervalTime); // Set an interval to update the data 
        return () => clearInterval(intervalId); // Clean up the interval
    }, [])

    // Logs the current index to track where the pointer currently is in the dataset 
    console.log("currentIndex:", currentIndex);

    // Shows a loading message until the data has been populated
    if (!visibleData.ABP.time_vector.length || !visibleData.HR.time_vector.length) {
        return <div>Loading...</div> 
    }

    return (
        <div className="grid grid-rows-2 gap-4 h-screen items-start bg-black">
            {/* Heart Rate Row */}
            <RowComponent title="HR" unit="bpm" color="lightgreen" data={visibleData.HR} optionPart={<FaHeart color="red" />} numberColor="lightgreen"/>
            {/* ABP Row */}
            <RowComponent title="ABP" unit="mmHg" color="red" data={visibleData.ABP} optionPart="120/80" numberColor="white"/>
            {/* Add more rows by reusing RowComponent */}
        </div>
    );
};

export default App;