import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import REGISTER from "./component/REGISTER";
import LOGIN from "./component/LOGIN";


function App() {
  return (
    <div className="App">
      <Link to="/rigester">rigester</Link>
      <Link to="/login">LOGIN</Link>
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />
        <Route path="/login" element={<LOGIN/>} />
      </Routes>
    </div>
  );
}

export default App;
