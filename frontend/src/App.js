import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Createprodact from "./component/create prodact";
import { REGISTER } from "./component/REGISTER/index";
import GetProdact from "./component/prodact/index";
import Getphotosmain from "./component/home_page_pic";
import { setHomeItems } from "./redux/reducers/homepage";
import photo from "./img/Screenshot_1.png";
import photo2 from "./img/Screenshot_2.png";
import { numberprodact } from "./redux/reducers/search";
import Pay from "./component/paypal";
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

import { ProductPage } from "./component/ProductPage/index";
import CartPage from "./component/CartPage/index";

import FOOTER from "./component/FOOTER";
import UserTable from "./component/UserTable/UserTable";
import ProductTable from "./component/ProductTable";

function App() {
  ///////////////////////////////search proccess//////////////////////////
  const dispacth = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((result) => {
        dispacth(setAllproduct(result.data.result));
        dispacth(numberprodact());
      })
      .catch((err) => {});

    axios
      .get(`http://localhost:5000/Homeiteams`)
      .then((resulat) => {
        dispacth(setHomeItems(resulat.data.resul));
      })
      .catch((err) => {});
  }, []);

  ////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <div className="mainphotos">
        <img className="mainphotosclass" src={photo}></img>
      </div>
      <div className="routesdiv">
      <NavBar />
      <CategoryBar />
        <Routes>
          <Route path="/rigester" element={<REGISTER />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/usersTable" element={<UserTable />} />
          <Route path="/admin/productTable" element={<ProductTable />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/creat" element={<Createprodact />} />
          <Route path="/admin/uplodphoto" element={<Getphotosmain />} />
          <Route path="/category/:id/products" element={<GetProdact />} />
          <Route path="/resulsearch" element={<PAGEAllRESULTSEARCH />} />
          <Route path="/category/product/:id" element={<ProductPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
        </Routes>
      <FOOTER />
      </div>
      <div className="mainphotos">
        <img className="mainphotosclass" src={photo2}></img>
      </div>
    </div>
  );
}

export default App;
