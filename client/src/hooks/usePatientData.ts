import {useEffect, useState} from "react";
import { AllDataType } from "../types";
// This test_data folder with ABP and HR data files is only used for testing plotting for now. It will be deleted later.
import abpTestData from "../test_data/ABP,Syst,Numeric,Float,IntelliVue,data.json" 
import hrTestData from "../test_data/HR,na,Numeric,Float,IntelliVue,data.json"

// Custom hook to manage the patient data
const usePatientData = () => {
    // Initializes the state for visualizing different measurement data of a patient, only ABP and HR for now
    const [visibleData, setVisibleData] = useState<AllDataType>({
        ABP: {time_vector: [], measurement_data: []},
        HR: {time_vector: [], measurement_data: []}
    });

    // Initializes the state for checking that data is currently being loaded 
    const [loading, setLoading] = useState(true);
    // Initializes the state for tracking the current index in the dataset
    const [currentIndex, setCurrentIndex] = useState(0);  


    const intervalTime = 1000; // Time interval for data updates
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
                        // Returns the updated state for visibleData and only shows the last 200 data points
                        // to simulate a sliding effect
                        return {
                            // Concatenates the existing ABP time and measurement data with the new data chunk, then only limits to the last 200 points.
                            ABP: {
                                time_vector: [...prevData.ABP.time_vector, ...timeVectorABP.slice(prevIndex, nextIndex)].slice(-200),
                                measurement_data: [...prevData.ABP.measurement_data, ...measurementDataABP.slice(prevIndex, nextIndex)].slice(-200)
                            },
                            // Concatenates the existing HR time and measurement data with the new data chunk, then only limits to the last 200 points.
                            HR: {
                                time_vector: [...prevData.HR.time_vector, ...timeVectorHR.slice(prevIndex, nextIndex)].slice(-200),
                                measurement_data: [...prevData.HR.measurement_data, ...measurementDataHR.slice(prevIndex, nextIndex)].slice(-200)
                            }
                        };
                    });

                    return nextIndex; // Updates currentIndex to the next index
                }
            });
        };
        
        const intervalId = setInterval(updateData, intervalTime); // Set an interval to update the data
        setLoading(false) ; // Finish loading data
        return () => clearInterval(intervalId); // Clean up the interval
    }, [])

    // Logs the current index to track where the pointer currently is in the dataset 
    console.log("currentIndex:", currentIndex);
    return {visibleData, loading};
}

export default usePatientData;