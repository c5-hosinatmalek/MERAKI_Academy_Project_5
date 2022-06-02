import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import REGISTER from "./component/REGISTER";
import {CategoryBar} from "./component/CategoryBar/index"
import { NavBar } from "./component/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <CategoryBar/>
      <Link to="/rigester">rigester</Link>
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />
        {/* shishany put page of products inside route below */}
        <Route path="/category/:id/products"/>  
      </Routes>
    </div>
  );
}

export default App;
