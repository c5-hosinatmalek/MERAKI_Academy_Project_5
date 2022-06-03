import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setLogin } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

const LOGIN = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [messegeUser, setMessageUser] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(" http://localhost:5000/login", { email, password })
      .then((result) => {
        dispatch(setLogin(result.data.token));
        setStatus(true);
        
        navigate("/")
       
      })
      .catch((err) => {
        setStatus(false);
        setMessageUser(err.response.data.message);
      });
  };

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
