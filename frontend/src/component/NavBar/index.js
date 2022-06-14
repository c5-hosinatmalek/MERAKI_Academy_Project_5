import { Link } from "react-router-dom";
import "./style.css";
import { RiAccountCircleFill } from "react-icons/ri";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LOGIN from "../LOGIN";
import logo from "./logo/logo.png"
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import jwtDecode from "jwt-decode";
import SEARCH from "../SEARCH";
import { useState } from "react";

const NavBar = () => {
  const [show, setShow] = useState();
  const [className, setClassName] = useState("");
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

  const logout = () => {
    dispacth(setLogout());
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
          <Link to={`/admin/usersTable`}>table users</Link>
          <Link to={`/admin/productTable`}>
            <p>table product</p>
          </Link>
          <Link to={`/admin/cart`}>
            <p>table checkout</p>
          </Link>
          <Link to={`/admin/uplodphoto`}>
            <p>uplodphoto</p>
          </Link>
        
        <Link to={`/`} >login</Link>
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
                  <ShoppingCartIcon color="balck" sx={{ fontSize: 55 }} />
                </div>
              </Link>
            ) : (
              <Link to={`/cart/${decodeToken("user_id")}`}>
                <div className="icons">
                  {" "}
                  <ShoppingCartIcon color="balck" sx={{ fontSize: 55 }} />
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export { NavBar };
