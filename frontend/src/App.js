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
import Getallcarts from "./component/getallcartadmin";
import LOGIN from "./component/LOGIN";
import ORDERSALE from "./component/product_used/create_order_sale";
import ALLORDERSALE from "./component/product_used/all_order_sale"
import ONEPRODUCTUSED from "./component/product_used/one_product_used";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllproduct } from "./redux/reducers/search";
import axios from "axios";
import PAGEAllRESULTSEARCH from "./component/SEARCH/page_result";
import ALLPRODUCTUSED from "./component/product_used/all_product_used";
import ALLPRODUCTFORADMIN from "./component/product_used/all_order_sale_admin";
import ADMINCONTROL from "./admin_control";
import { CategoryBar } from "./component/CategoryBar/index";

import Homepage from "./component/homepage";

import { NavBar } from "./component/NavBar";

import { ProductPage } from "./component/ProductPage/index";
import CartPage from "./component/CartPage/index";
import jwtDecode from "jwt-decode";
import FOOTER from "./component/FOOTER";
import UserTable from "./component/UserTable/UserTable";
import ProductTable from "./component/ProductTable";
import {SoldTable} from "./component/SoldItemTable/index";


import { SubCatgoryPage } from "./component/SubCategoryPage/index";


function App() {
  ///////////////////////////////search proccess//////////////////////////
  const dispacth = useDispatch();

  const state = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
    };
  });

  const decodeToken = (columnName) => {
    if (state.isLoggedIn) {
      return jwtDecode(state.token)[columnName];
    }
  };

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



  

  if(decodeToken("role")===1){


    return(
    <div className="App">
    <div className="mainphotos">
      <img className="mainphotosclass" src={photo}></img>
    </div>
    <NavBar />
    <div className="routesdiv_admin">
    
      <ADMINCONTROL/>
      <Routes>
        <Route path="/admin/usersTable" element={<UserTable />} />
        <Route path="/admin/productTable" element={<ProductTable />} />
        <Route path="/creat" element={<Createprodact />} />
        <Route path="/admin/uplodphoto" element={<Getphotosmain />} />
        <Route path="/all_order_sale_for_admin" element={<ALLPRODUCTFORADMIN/>}/>
        <Route path="/admin/soldTable" element={<SoldTable/>}/>
      </Routes>
    
    </div>
    <div className="mainphotos">
      <img className="mainphotosclass" src={photo2}></img>
    </div>
  </div>
    )
  }else{
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
            <Route path="/category/product/:id" element={<ProductPage />}/>
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/create_order_sale" element={<ORDERSALE/>} />
            <Route path="/all_order_sale" element={<ALLORDERSALE/>} />
            <Route path="/all_product_used" element={<ALLPRODUCTUSED/>} />
            <Route path="/all_order_sale_for_admin" element={<ALLPRODUCTFORADMIN/>}/>
            <Route path="/one_product_used/:id" element={<ONEPRODUCTUSED/>} />
               <Route path="/admin/cart" element={<Getallcarts />} />
               <Route
                path="/subCategory/:subCategory_id"
                element={<SubCatgoryPage />}/>
             
               

       
          </Routes>
        <FOOTER />
        </div>
        <div className="mainphotos">
          <img className="mainphotosclass" src={photo2}></img>
        </div>

      </div>)

      }}
          
         

   
    








export default App;
