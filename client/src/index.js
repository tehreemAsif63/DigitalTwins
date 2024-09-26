// initializes a React application and includes performance reporting
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App.tsx";

// Create a root element for the React app to attach to
const root = ReactDOM.createRoot(document.getElementById("root"));
//Display the App component inside the root element.
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
