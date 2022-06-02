import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import REGISTER from "./components/REGISTER";

function App() {
  return (
    <div className="App">
      <Link to="/rigester">rigester</Link>
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />
      </Routes>
    </div>
  );
}

export default App;
