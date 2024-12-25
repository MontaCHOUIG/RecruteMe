import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Home from "./pages/home";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applyJob/:id" element={<ApplyJob />} />
      </Routes>
    </div>
  );
}

export default App;
