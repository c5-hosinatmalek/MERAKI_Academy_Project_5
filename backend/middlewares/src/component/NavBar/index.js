import { Link } from "react-router-dom";
import "./style.css";
import { BsCart4 } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import LOGIN from "../LOGIN";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import jwtDecode from "jwt-decode";
import SEARCH from "../SEARCH";
const NavBar = () => {
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

  return (
    <div className="navbar">
        {decodeToken("role")==1?
        <div className="navAdmin">
        <p>table users</p>
        <p>table product</p>
        <p>table checkout</p>
        
        </div>:
        <div className="navUser">
      <Link to={"/"}>
        <img
          className="logo"
          src="http://res.cloudinary.com/doxxh3kej/image/upload/v1654159311/t7ldyjgrus0wqhqe4pns.jpg"
        />
      </Link>
      <SEARCH />
      <dev>
        <Link to={"/login"} className="myAccount">
          <RiAccountCircleLine className="myaccount" />
          My Account
        </Link>
        {state.isLoggedIn ? (
          <ul>
            <li>{decodeToken("userName")}</li>
            <li onClick={logout}>Logout</li>
          </ul>
        ) : (
          <ul className="myAccountList">
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/rigester">Register</Link>
            </li>
          </ul>
        )}
      </dev>
      {!state.isLoggedIn ? (
        <Link to={"/login"}>
          <BsCart4 className="cartLogo" />
        </Link>
      ) : (
        <Link to={`/cart/${decodeToken("user_id")}`}>
          <BsCart4 className="cartLogo" />
        </Link>
      )}
      </div>}
      
      
    </div>
  );
};
export { NavBar };
