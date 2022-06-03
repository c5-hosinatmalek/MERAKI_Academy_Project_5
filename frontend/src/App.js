import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import {REGISTER} from "./component/REGISTER/index";
 import Getproduct from "./component/Prodact/index"
import LOGIN from "./component/LOGIN";


import {CategoryBar} from "./component/CategoryBar/index"
import { NavBar } from "./component/NavBar";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <CategoryBar/>
      <Link to="/rigester">rigester</Link>
      <Link to="/login">LOGIN</Link>
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />

        <Route path="/login" element={<LOGIN/>} />

        {/* shishany put page of products inside route below */}
        <Route path="/category/:id/products" element={<Getproduct/>}/>  
      </Routes>
    </div>
  );
}

export default App;
