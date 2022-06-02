import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import REGISTER from "./component/REGISTER";
import {CategoryBar} from "./component/CategoryBar/index"

function App() {
  return (
    <div className="App">
      <CategoryBar/>
      <Link to="/rigester">rigester</Link>
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />
        <Route path="/category/:id/products"/>
      </Routes>
    </div>
  );
}

export default App;
