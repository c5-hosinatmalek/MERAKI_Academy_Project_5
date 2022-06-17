import { Link } from "react-router-dom";
import "./style.css";
import { RiAccountCircleFill } from "react-icons/ri";
import React from "react";
import { useNavigate } from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";


import logo from "./logo/logo.png"
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import jwtDecode from "jwt-decode";
import SEARCH from "../SEARCH";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const navigate =useNavigate()
  const [show, setShow] = useState();
  const [className, setClassName] = useState("");
  const dispacth = useDispatch();
  const state = useSelector((state) => {
    return {
      cartcontent:state.cart.cart,
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
    };
  });
  const decodeToken = (columnName) => {
    if (state.isLoggedIn) {
      return jwtDecode(state.token)[columnName];
    }
  };

  const logout = () => {
    dispacth(setLogout());
    navigate("/")

  };
  ///////////////////////////////////////////////////////////////
  const sowHide = () => {
    setShow(!show);

    if (show) {
      setClassName("active");
    } else {
      setClassName("");
    }
  };
  ////////////////////////////////////////////////////////////////
  return (
    <div className="navbar">
      {decodeToken("role") == 1 ? (
        <div className="navAdmin">
<img src={logo} className="logo_nameAdmin"></img>
<h1 className="navtiltle">Admin Page</h1>
          
<div className="my_account_contener">
            <div className="icons" onClick={sowHide}>
              {" "}
              <RiAccountCircleFill sx={{ fontSize: 55 }} className="icons" /> 
            </div>
              <ul className={`ul ${className}`} id="adminlist">
                <li className="li_1">{decodeToken("userName")}</li>
                <li className="li_2" onClick={logout}>Logout</li>

              </ul>
              </div>
        </div>
      ) : (
        <div className="navUser">
          <Link to={"/"}>

<img src={logo} className="logo_name"></img>
          </Link>
          <SEARCH />
          <div className="my_account_contener">
            <div className="icons" onClick={sowHide}>
              {" "}
              <RiAccountCircleFill sx={{ fontSize: 55 }} className="icons" /> 
            </div>

            {state.isLoggedIn ? (
              <ul className={`ul ${className}`}>
                <li className="li_1">{decodeToken("userName")}</li>

                <li className="li_1" ><Link to="/create_order_sale" >order sale</Link></li>
                <li className="li_1" ><Link to="/all_order_sale" >All Order Sale</Link></li>
                <li className="li_2" onClick={logout}>Logout</li>

              </ul>
            ) : (
              <ul className={`ul ${className}`}>
                <li className="li_1">
                  <Link to="/login">login</Link>
                </li>
                <li className="li_2">
                  <Link to="/rigester">Register</Link>
                </li>
              </ul>
            )}

            {!state.isLoggedIn ? (
              <Link className="contener_logcart" to={"/login"}>
                <div className="icons">
                  {" "}
                  <FaShoppingCart  />
                </div>
               
              </Link>
            ) : (
              <Link className="contener_logcart" to={`/cart/${decodeToken("user_id")}`}>
                <div className="icons">
                  {" "}
                  <FaShoppingCart  />
                </div>
              
              </Link>
            )}
            <h1 className="menu_icon"  ><MenuIcon  sx={{ fontSize: 55 }} /></h1>
          </div>
        </div>
      )}
    </div>
  );
};
export { NavBar };
