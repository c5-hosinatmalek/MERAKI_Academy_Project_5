import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const REGISTER = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountryy] = useState("");
  const role_id = 1;
  const [messageUser, setMessageUser] = useState("");
  const [status, setStatus] = useState(false);
  const [countries, setCountry] = useState([]);

//////////////////////////////////////// regester with googel
const clientId =
    "980966372884-i6imm3d62qcd07h3gdllhci878oa6dt2.apps.googleusercontent.com";
  const onsucces = (res) => {
    setEmail(res.profileObj.email)
    setName(res.profileObj.name)
    setPassword(res.profileObj.googleId)
    setCountryy(null);
    console.log( email,
      password,
      name,
      country,
      role_id);
    axios
      .post(`http://localhost:5000/register`, {
        email,
        password,
        name,
        country,
        role_id,
      })
      .then((result) => {
        if (result.data.success) {
          setStatus(true);
          setMessageUser("account created successfully");
        }
      })
      .catch((err) => {
        setStatus(false);
        setMessageUser("Error happened while register, please try again");
      });
     
    
  };
  const onfailure = (res) => {
    setMessageUser("Error happened while register, please try again");
  };
  ////////////////////////////////////////////////////////
  const submit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/register`, {
        email,
        password,
        name,
        country,
        role_id,
      })
      .then((result) => {
        if (result.data.success) {
          setStatus(true);
          setMessageUser("account created successfully");
        }
      })
      .catch((err) => {
        setStatus(false);
        setMessageUser("Error happened while register, please try again");
      
      });
  };
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/capital")
      .then((result) => {
        setCountry(result.data.data);
        // console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="rigister">
      <div className="containeeer">
        <form className="form_rigister" onSubmit={submit}>
          <div className="name_user">
            <label>Enter Name</label>
            <input
              type="text"
              placeholder="ENTER NAME"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="email_user">
          <label>Enter Email</label>
            <input
              type="text"
              placeholder="enter email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="country_user">
          <label>Choose Country</label>
            <select
              onChange={(e) => {
                setCountryy(e.target.value);
              }}
            >
              {countries &&
                countries.map((element, index) => {
                  return <option key={index}>{element.name}</option>;
                })}
            </select>
          </div>

          <div className="password_user">
          <label>Enter Password</label>
            <input
              type="password"
              placeholder="enter_pasword"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="rigester_button">
            <button>Register</button>
          </div>
          <div className="regester_googel" >
          <GoogleLogin
            clientId={clientId}
            buttonText="Regester With Googel"
            onSuccess={onsucces}
            onFailure={onfailure}
          />
          </div>
          {status ? (
            <div className="message_user">
              <h1>{messageUser}</h1>
            </div>
          ) : (
            <div className="message_user">
              <h1>{messageUser}</h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export { REGISTER };
