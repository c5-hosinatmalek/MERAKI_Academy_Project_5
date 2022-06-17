import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import "./style.css";
const LOGIN = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountryy] = useState("");
  const role_id = 2;
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [messegeUser, setMessageUser] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = () => {
    axios
      .post(" http://localhost:5000/login", { email, password })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        setStatus(true);
        navigate("/");
      })
      .catch((err) => {
        setStatus(false);
        setMessageUser(err.response.data.message);
      });
  };

  const clientId =
    "980966372884-i6imm3d62qcd07h3gdllhci878oa6dt2.apps.googleusercontent.com";
  const onsucces = (res) => {
    axios
      .post(`http://localhost:5000/register`, {
        email: res.profileObj.email,
        password: res.profileObj.googleId,
        name: res.profileObj.name,
        country,
        role_id,
      })
      .then((result) => {
        if (result.data.success) {
          setStatus(true);
          axios
            .post(" http://localhost:5000/login", {
              email: res.profileObj.email,
              password: res.profileObj.googleId,
            })
            .then((result) => {
              dispatch(setLogin(result.data.token));
              setStatus(true);

              navigate("/");
            })
            .catch((err) => {
              setStatus(false);
              setMessageUser(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.response.data.err.code);
        if (err.response.data.err.code === "ER_DUP_ENTRY") {
          axios
            .post(" http://localhost:5000/login", {
              email: res.profileObj.email,
              password: res.profileObj.googleId,
            })
            .then((result) => {
              dispatch(setLogin(result.data.token));
              setStatus(true);

              navigate("/");
            })
            .catch((err) => {
              setStatus(false);
              setMessageUser(err.response.data.message);
            });
        } else {
          setStatus(false);
          setMessageUser("Error happened while register, please try again");
        }
      });
  };

  const onfailure = (res) => {
    console.log(res);
  };

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }
  //   gapi.load("clint:auth2", start);
  // },[]);

  return (
    <div className="mainlogin">
      <div className="logginheader">
        <h1 className="AccountLogin">Account Login</h1>
        <div className="detalislogin">
          <h3>Welcome To City Center</h3>
          <p>
            By creating an account you will be able to shop faster, be up to
            date on an order's status, and keep track of the orders you have
            previously made.
          </p>
        </div>
      </div>

      <div className="childlogin">
        <div className="login_user">
          <div className="loginh3">
            <div className="emaildiv">
            <h3>Email</h3>
            <input
              className="loginput"
              placeholder="enter email..."
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            </div>
            <div className="passworddiv">
            <h3>Password</h3>
            <input
              className="loginput"
              placeholder="enter password..."
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            </div>
          </div>
          <div className="logininput"></div>
        </div>

        <div className="login_buttons">
          <div>
            <button
              className="login_button"
              onClick={() => {
                console.log(true);
                submit();
              }}
            >
              Login
            </button>
          </div>
          <div>
            <GoogleLogin
              className="login_button"
              clientId={clientId}
              buttonText="Googel "
              onSuccess={onsucces}
              onFailure={onfailure}
            />
          </div>
        </div>
        {status ? (
          <div className="message_user">
            <h1>{messegeUser}</h1>
          </div>
        ) : (
          <div className="message_user">
            <h1>{messegeUser}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default LOGIN;
