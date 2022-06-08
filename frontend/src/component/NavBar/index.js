import { Link } from "react-router-dom";
import "./style.css";
import { BsCart4 } from "react-icons/bs";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LOGIN from "../LOGIN";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import jwtDecode from "jwt-decode";
import SEARCH from "../SEARCH";
import { useState } from "react";

const NavBar = () => {
  const [show, setShow] = useState(false);
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
          <p>table users</p>
          <p>table product</p>
          <p>table checkout</p>
        </div>
      ) : (
        <div className="navUser">
          <Link to={"/"}>
            <h1 className="logo_name">ComTech</h1>
          </Link>
          <SEARCH />
          <div className="my_account_contener">
            <div className="icons"  onClick={sowHide} >
              {" "}
              <AccountBoxIcon  sx={{ fontSize: 55 }} />
            </div>

            {state.isLoggedIn ? (
              <ul className={`ul ${className}`}>
                <li className="li_1">{decodeToken("userName")}</li>
                <li className="li_2" onClick={logout}>Logout</li>
              </ul>
            ) : (
              <ul className={`ul ${className}`}>
                <li className="li_1" >
                  <Link to="/login">login</Link>
                </li>
                <li className="li_2">
                  <Link to="/rigester">Register</Link>
                </li>
              </ul>
            )}

            {!state.isLoggedIn ? (
              <Link to={"/login"}>
                <div className="icons"> <ShoppingCartIcon color="balck" sx={{ fontSize: 55 }} /></div>
               
              </Link>
            ) : (
              <Link to={`/cart/${decodeToken("user_id")}`}>
                 <div className="icons"> <ShoppingCartIcon color="balck" sx={{ fontSize: 55 }} /></div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export { NavBar };
