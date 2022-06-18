import React from "react";
import { useState, useEffect,useRef} from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
const REGISTER = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountryy] = useState("");
  const role_id = 2;
  const [messageUser, setMessageUser] = useState("");
  const [status, setStatus] = useState(false);
  const [countries, setCountry] = useState([]);
  const [verfied, setVerfied] = useState("");
  const [checkVerfied, setCheckVerfied] = useState(false);
  const [compareWord, setCompareWord] = useState("");
  const nameinput=useRef()
  const emailinput=useRef()
  const pasinput=useRef()
  const countryinput=useRef()
  const submitputtoum=useRef()
  const varInput=useRef()

  const navigate=useNavigate("")

  const verfiedClick = (e) => {
    if (compareWord !== verfied) {
      setMessageUser("The code is wrong");
      return;
    }

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
         
          setMessageUser("Account created successfully");
setTimeout(() => {
  navigate("/login")
}, 3000);
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessageUser("Error happened while register, please try again");
        console.log(err);
      });
  };
  const submit = (e) => {
    e.preventDefault();
    if(!email && !password && !name){
      setMessageUser("Please fill out all fields")
      return
    }
    axios
      .get(`http://localhost:5000/user/${email}`)
      .then((result) => {
        if (result.data.result.length !== 0) {
          setMessageUser("This email is already exist");
          return;
        }
       
        setMessageUser("")
        setCheckVerfied(true);
        createVerfiedWord();
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/capital")
      .then((result) => {
        setCountry(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      nameinput.current.focus()
  }, []);
  const createVerfiedWord = () => {
    let verfiedWord = "";
    const letterAndNum = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "o",
      "n",
      "m",
      "p",
      "q",
      "w",
      "r",
      "t",
      "y",
      "u",
      "s",
      "z",
      "x",
      "v",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];
    for (let index = 0; index < 6; index++) {
      verfiedWord +=
        letterAndNum[Math.round(Math.random() * letterAndNum.length)];
    }
    setVerfied(verfiedWord);

    axios
      .post("http://localhost:5000/email", {
        email,
        subject: "verfied code",
        emailBody: `Your verfied code is ${verfiedWord}`,
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!checkVerfied ? (
        <div className="mainregster">
          <h1 className="Register">Register Account</h1>
          <div className="test3">
            <div>
              <h3 className="parRegister">
                If you already have an account with us, please login at the
                  <Link to={"/login"} > login page.</Link>   
              </h3>
            </div>
            <div className="containeeer_rigister">
              <form className="form_rigister" onSubmit={submit}>
                <>
                  <div className="titel_regester"> </div>
                  <div className="space">
                    <div className="inputname">
                    <div className="regstierinputs">
                      <div className="input_user">
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Name
                      </h3>
                        <input
                        onKeyDown={(e)=>{
                          e.key==="Enter"?emailinput.current.focus():nameinput.current.focus()
                        }}
                          ref={nameinput}
                          className="inputregstier"
                          type="text"
                          placeholder="User Name"
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="input_user">
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Email
                      </h3>
                        <input
                        onKeyDown={(e)=>{
                       
                        e.key==="Enter"?countryinput.current.focus():emailinput.current.focus()
                        }}
                        ref={emailinput}
                          className="inputregstier"
                          type="text"
                          placeholder="Email"
                          required
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="input_user">
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Country
                      </h3>
                        <select
                        onKeyDown={(e)=>{
                          e.key==="Enter"?pasinput.current.focus():countryinput.current.focus()
                        }}
                        ref={countryinput}
                          className="countryRegister"
                          onChange={(e) => {
                            setCountryy(e.target.value);
                          }}
                        >
                          {countries &&
                            countries.map((element, index) => {
                              return (
                                <option key={index}>{element.name}</option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="input_user">
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Password
                      </h3>
                        <input
                        onKeyDown={(e)=>{
                          e.key==="Enter"?submitputtoum.current.focus(): pasinput.current.focus()
                        }}
                          ref={pasinput}
                          className="inputregstier"
                          type="password"
                          placeholder="Pasword"
                          required
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      </div>
                    </div>
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
                </>
              </form>
          </div>
          <div className="Register">
            <button  ref={submitputtoum} className="registerButton" onClick={submit}>Register</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="verfiedDiv">
         
          <div className="titel_regester">
           
            <h1>verfied</h1>
          </div>
          <div className="parAndInputDev"> 
          <p className="varPar">Enter the verfied code, it was send to your email</p>
          <input
          ref={varInput}
          className="varInput"
            maxLength={6}
            onChange={(e) => {
              setCompareWord(e.target.value);
            }}
          />
          <button className="verButton"
            onClick={() => {
              verfiedClick();
            }}
          >
            Verfied email
          </button>
          <div className="message_user">
            </div>
            <h1>{messageUser}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export { REGISTER };
