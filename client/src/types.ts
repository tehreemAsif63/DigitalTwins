// Defines the structure of the data used for rendering the graph in the RowComponent.
interface DataType {
    time_vector: number[];
    measurement_data: number[];
}

// Defines the general structure for the data contains different patient measurement data
export interface AllDataType {
    ABP: DataType,
    HR: DataType
    // Add more data types later
}
