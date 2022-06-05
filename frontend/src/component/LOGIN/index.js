import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

const LOGIN = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [messegeUser, setMessageUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
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
    console.log(res);
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
    <div className="login_user">
      <form onSubmit={submit}>
        <div className="titel">
          <h1>Login</h1>
        </div>
        <div className="email_login">
          <input
            placeholder="enter email..."
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passward_login">
          <input
            placeholder="enter password..."
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login_button">
          <button>Login</button>
        </div>
        <div className="googel">
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onsucces}
            onFailure={onfailure}
          />
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
      </form>
    </div>
  );
};
export default LOGIN;
