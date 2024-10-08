// Defines the structure of the data used for rendering the graph in the RowComponent.
export interface DataType {
    time_vector: number[];
    measurement_data: number[];
}

// Defines the general structure for the data contains different patient measurement data
export interface AllDataType {
    ["ABP,Dias"]: DataType,
    ["ABP,Mean"]: DataType,
    ["ABP,Syst"]: DataType,
    ["HR,na"]: DataType,
    ["RR,na"]: DataType,
    ["SpO2,na"]: DataType,
    ["Tvesic,na"]: DataType,
    ["rSO2,Left"]: DataType,
    ["rSO2,Right"]: DataType,
    // Add more data types if needed 
}
