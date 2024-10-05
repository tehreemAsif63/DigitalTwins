// Defines the structure of the data used for rendering the graph in the RowComponent.
export interface DataType {
    time_vector: number[];
    measurement_data: number[];
}

// Defines the general structure for the data contains different patient measurement data
export interface AllDataType {
    ABP_Dias: DataType,
    ABP_Mean: DataType,
    ABP_Syst: DataType,
    HR: DataType,
    RR: DataType,
    SpO2: DataType,
    Tvesic: DataType,
    rSO2_Left: DataType,
    rSO2_Right: DataType,
    // Add more data types if needed 
}
