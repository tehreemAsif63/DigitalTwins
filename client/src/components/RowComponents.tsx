import React from 'react'
import Plot from 'react-plotly.js';

// Defines the properties that the RowComponent will accept as props.
interface RowComponentProps {
    title: string;
    unit: string;
    color: string;
    numberColor: string;
    data: {
        time_vector: number[];
        measurement_data: number[];
    };
    optionPart?: React.ReactNode; // Take both strings or JSX
}

// A reusable component that displays a graph and corresponding number indicator.
const RowComponent: React.FC<RowComponentProps> = ({ title, unit, color, data, optionPart, numberColor }) => {
    const currentValue = data.measurement_data[data.measurement_data.length - 1];
    return (
        <div className="grid grid-cols-3 h-screen items-start bg-black">
            {/* Left side: Plotly graph */}
            <div className="col-span-2 p-4 h-full items-stretch">
                <Plot
                    data={[
                        {
                            x: data.time_vector,
                            y: data.measurement_data,
                            type: "scatter",
                            mode: "lines",
                            line: { color },
                        },
                    ]}
                    layout={{
                        title: "",
                        xaxis: {
                            showticklabels: false,
                            color: "lime",
                            zeroline: false,
                        },
                        yaxis: {
                            showticklabels: false,
                            color: "lime",
                            zeroline: false,
                        },
                        plot_bgcolor: "black",
                        paper_bgcolor: "black",
                        font: {
                            color: "lime",
                        },
                        autosize: true,
                        margin: {
                            t: 50,
                            r: 0,
                            l: 10,
                            b: 50
                        },
                        padding: {
                            r: 20
                        }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "280px" }}
                />
            </div>

            {/* Right side: number display */}
            <div className="col-span-1 flex flex-col justify-start items-center relative bg-black p-8 h-full">
                {/* Optional standard values and current value */}
                <div className="flex items-center pt-12">
                    {/* Conditionally render when a value is passed */}
                    <div className="text-white lg:text-5xl md:text-4xl sm:text-xl font-bold mr-10">
                        {optionPart}
                    </div>

                    {/* Current ABP number */}
                    <div className="text-white font-bold sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl truncate" style={{ color: numberColor}}>
                        {Math.round(currentValue)}
                    </div>
                </div>

                {/* Unit in the top right corner */}
                <div className="absolute top-4 right-4 text-white text-xs p-6" style={{ color: numberColor}}>
                    {title} {unit}
                </div>
            </div>
        </div>
    )
}

export default RowComponent;