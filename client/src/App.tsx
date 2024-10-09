import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView.tsx";


const App = () => { 
    return (
      // Manage routes of page view
      <Routes>

        <Route path="/" element={<HomeView />} /> 

      </Routes>
    );
};

export default App;