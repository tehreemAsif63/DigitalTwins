import {useEffect, useState} from "react";
import { AllDataType } from "../types";
import { fetchPatientData } from "../apiFunctions.ts";

// Custom hook to manage the patient data
const usePatientData = () => {
    // Initializes the state for visualizing different measurement data of a patient, only ABP and HR for now
    const [visibleData, setVisibleData] = useState<AllDataType>({
        ABP_Dias: { time_vector: [], measurement_data: [] },
        ABP_Mean: { time_vector: [], measurement_data: [] },
        ABP_Syst: { time_vector: [], measurement_data: [] },
        HR: { time_vector: [], measurement_data: [] },
        RR: { time_vector: [], measurement_data: [] },
        SpO2: { time_vector: [], measurement_data: [] },
        Tvesic: { time_vector: [], measurement_data: [] },
        rSO2_Left: { time_vector: [], measurement_data: [] },
        rSO2_Right: { time_vector: [], measurement_data: [] },
    });

    // Initializes the state for checking that data is currently being loaded 
    const [loading, setLoading] = useState(true);
    // Initializes the state for tracking the current index in the dataset
    const [currentIndex, setCurrentIndex] = useState(0);  
    // Initializes the state 'fetchedData' with an object consisting of multiple data types of patients
    const [fetchedData, setFetchedData] = useState({
        ABP_Dias: { time_vector: [], measurement_data: [] },
        ABP_Mean: { time_vector: [], measurement_data: [] },
        ABP_Syst: { time_vector: [], measurement_data: [] },
        HR: { time_vector: [], measurement_data: [] },
        RR: { time_vector: [], measurement_data: [] },
        SpO2: { time_vector: [], measurement_data: [] },
        Tvesic: { time_vector: [], measurement_data: [] },
        rSO2_Left: { time_vector: [], measurement_data: [] },
        rSO2_Right: { time_vector: [], measurement_data: [] },
    });

    const fetchIntervalTime = 5000; // Time interval for data fetching
    const updateIntervalTime = 1000; // Time interval for data updates
    const chunkSize = 20; // Number of data points to fetch per update

    useEffect(() => {
        // Fetch data every 10 seconds
        const fetchData = async() => {
            try {
                const fetchedDataSet = await fetchPatientData("1", "data");
                console.log("fetched data from backend:", fetchedDataSet.data);
                setFetchedData({
                    ABP_Dias: {
                        time_vector: fetchedDataSet.data['ABP,Dias'].time_vector.flat(),
                        measurement_data: fetchedDataSet.data['ABP,Dias'].measurement_data.flat(),
                    },
                    ABP_Mean: {
                        time_vector: fetchedDataSet.data['ABP,Mean'].time_vector.flat(),
                        measurement_data: fetchedDataSet.data['ABP,Mean'].measurement_data.flat(),
                    },
                    ABP_Syst:  {
                        time_vector: fetchedDataSet.data['ABP,Syst'].time_vector.flat(),
                        measurement_data: fetchedDataSet.data['ABP,Syst'].measurement_data.flat(),
                    }, 
                    HR: {
                        time_vector: fetchedDataSet.data['HR,na'].time_vector.flat(),
                        measurement_data: fetchedDataSet.data['HR,na'].measurement_data.flat(),
                    },
                    RR: {
                        time_vector: fetchedDataSet.data['RR,na'].time_vector.flat(),
                        measurement_data: fetchedDataSet.data['RR,na'].measurement_data.flat(),
                    },
                    SpO2: { 
                        time_vector: fetchedDataSet.data['SpO2,na'].time_vector.flat(), 
                        measurement_data: fetchedDataSet.data['SpO2,na'].measurement_data.flat(), 
                    },
                    Tvesic: { 
                        time_vector: fetchedDataSet.data['Tvesic,na'].time_vector.flat(), 
                        measurement_data: fetchedDataSet.data['Tvesic,na'].measurement_data.flat(), 
                    },
                    rSO2_Left: { 
                        time_vector: fetchedDataSet.data['rSO2,Left'].time_vector.flat(), 
                        measurement_data: fetchedDataSet.data['rSO2,Left'].measurement_data.flat(), 
                    },
                    rSO2_Right: { 
                        time_vector: fetchedDataSet.data['rSO2,Right'].time_vector.flat(), 
                        measurement_data: fetchedDataSet.data['rSO2,Right'].measurement_data.flat(), 
                    },
                
                })
            } catch (err) {
                console.error("Error in fetching data: ", err);
            }
        }

        // Updates the visibleData
        const updateData = () => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + chunkSize;

                setVisibleData((prevData) => {
                    // Returns the updated state for visibleData and only shows the last 200 data points
                    // to simulate a sliding effect
                    return {
                        // Concatenates the existing data type's time and measurement data with the new data chunk, then only limits to the last 200 points.
                        ABP_Dias: {
                            time_vector: [...prevData.ABP_Dias.time_vector, ...fetchedData.ABP_Dias.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.ABP_Dias.measurement_data, ...fetchedData.ABP_Dias.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        ABP_Mean: {
                            time_vector: [...prevData.ABP_Mean.time_vector, ...fetchedData.ABP_Mean.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.ABP_Mean.measurement_data, ...fetchedData.ABP_Mean.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        ABP_Syst: {
                            time_vector: [...prevData.ABP_Syst.time_vector, ...fetchedData.ABP_Syst.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.ABP_Syst.measurement_data, ...fetchedData.ABP_Syst.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        HR: {
                            time_vector: [...prevData.HR.time_vector, ...fetchedData.HR.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.HR.measurement_data, ...fetchedData.HR.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        RR: {
                            time_vector: [...prevData.RR.time_vector, ...fetchedData.RR.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.RR.measurement_data, ...fetchedData.RR.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        SpO2: {
                            time_vector: [...prevData.SpO2.time_vector, ...fetchedData.SpO2.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.SpO2.measurement_data, ...fetchedData.SpO2.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        Tvesic: {
                            time_vector: [...prevData.Tvesic.time_vector, ...fetchedData.Tvesic.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.Tvesic.measurement_data, ...fetchedData.Tvesic.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        rSO2_Left: {
                            time_vector: [...prevData.rSO2_Left.time_vector, ...fetchedData.rSO2_Left.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.rSO2_Left.measurement_data, ...fetchedData.rSO2_Left.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        },
                        rSO2_Right: {
                            time_vector: [...prevData.rSO2_Right.time_vector, ...fetchedData.rSO2_Right.time_vector.slice(prevIndex, nextIndex)].slice(-200),
                            measurement_data: [...prevData.rSO2_Right.measurement_data, ...fetchedData.rSO2_Right.measurement_data.slice(prevIndex, nextIndex)].slice(-200)
                        }
                    }
                });
                return nextIndex; // Updates currentIndex to the next index                            
                }
            )};
        
        const fetchIntervalId = setInterval(fetchData, fetchIntervalTime); // Set an interval to fetch the data
        const updateIntervalId = setInterval(updateData, updateIntervalTime); // // Set an interval to update the data

        setLoading(false) ; // Finish loading data
        return () => {
            // Clean up the interval
            clearInterval(fetchIntervalId); 
            clearInterval(updateIntervalId);
        }
    }, [fetchedData])
    return {visibleData, loading};
}

export default usePatientData;