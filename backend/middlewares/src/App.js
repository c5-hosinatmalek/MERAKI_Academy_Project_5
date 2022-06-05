import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Createprodact from "./component/create prodact";
import {REGISTER} from "./component/REGISTER/index"
import GetProdact from "./component/prodact/index";


import LOGIN from "./component/LOGIN";
/////////////////////////////////////////////////////////////search proccess///////
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllproduct } from "./redux/reducers/search";
import axios from "axios";
import PAGEAllRESULTSEARCH from "./component/SEARCH/page_result";
////////////////////////////////////////////////////////////
import { CategoryBar } from "./component/CategoryBar/index";

import Homepage from "./component/homepage";


import { NavBar } from "./component/NavBar";

import {ProductPage} from "./component/ProductPage/index"
import CartPage from "./component/CartPage/index"


import FOOTER from "./component/FOOTER";
function App() {
  ///////////////////////////////search proccess//////////////////////////
  const dispacth = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((result) => {
        dispacth(setAllproduct(result.data.result));
      })
      .catch((err) => {});
  }, []);
  ////////////////////////////////////////////////////////////////////
  return (
    <div className="App">

      <NavBar/>
      <CategoryBar/>
      
      
      <Routes>
        <Route path="/rigester" element={<REGISTER />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LOGIN/>} />
        <Route path="/creat" element={<Createprodact/>} />
        
        <Route path="/category/:id/products" element={<GetProdact/>}/>
          <Route path="/resulsearch" element={<PAGEAllRESULTSEARCH />} />
          <Route path="/category/product/:id" element={<ProductPage/>}/>
          <Route path="/cart/:id" element={<CartPage/>}/>

      </Routes>
      <FOOTER/>
    </div>
  );
}

export default App;
