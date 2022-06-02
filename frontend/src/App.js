import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import LOGIN from "./components/REGISTER";

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Link to="/rigester">rigester</Link>
      <Routes>
        <Route path="/rigester" element={<LOGIN />} />
      </Routes>
    </div>
  );
}

export default App;
