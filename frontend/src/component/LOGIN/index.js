import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
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
    
    axios
      .post(`http://localhost:5000/register`, {
        email:res.profileObj.email,
        password:res.profileObj.googleId,
        name:res.profileObj.name,
        country,
        role_id,
      })
      .then((result) => {
        if (result.data.success) {
          setStatus(true)
          axios
            .post(" http://localhost:5000/login", { email:res.profileObj.email, password:res.profileObj.googleId })
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
            .post(" http://localhost:5000/login", { email:res.profileObj.email, password:res.profileObj.googleId })
            .then((result) => {
              dispatch(setLogin(result.data.token));
              setStatus(true);

              navigate("/");
            })
            .catch((err) => {
              setStatus(false);
              setMessageUser(err.response.data.message);
            });
        }else{
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
    <div className="login_user">
      <form onSubmit={submit}>
        <div className="titel">
          <h1>Login</h1>
        </div>
        <div className="email_login">
          <label> Email</label>
          <input
            placeholder="enter email..."
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passward_login">
          <label> Password </label>
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
      <GoogleLogin
            clientId={clientId}
            buttonText="By Googel "
            onSuccess={onsucces}
            onFailure={onfailure}
          />
    </div>
  );
};
export default LOGIN;
