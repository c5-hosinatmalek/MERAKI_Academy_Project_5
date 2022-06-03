import { Link } from "react-router-dom";
import "./style.css";
import { BsCart4 } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import LOGIN from "../LOGIN";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/reducers/auth";
import {jwt_decode} from "jwt-decode"
const NavBar = () => {
  const dispacth = useDispatch();
  const state = useSelector((state) => {
      console.log(state);
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token:state.auth.token
    };
  });
  if (state.isLoggedIn) {
      console.log(state.token);
  }

  const logout = () => {
    dispacth(setLogout());
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        src="http://res.cloudinary.com/doxxh3kej/image/upload/v1654159311/t7ldyjgrus0wqhqe4pns.jpg"
      />
      <dev>
        <Link to={"/login"} className="myAccount">
          <RiAccountCircleLine className="myaccount" />
          My Account
        </Link>
        {state.isLoggedIn ? (
          <ul>
            <li>username</li>
            <li onClick={logout}>logout</li>
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
      <p>
        <BsCart4 />
      </p>
    </div>
  );
};
export { NavBar };
