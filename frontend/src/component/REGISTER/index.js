import React from "react";
import { useState, useEffect } from "react";
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
          setMessageUser("account created successfully");
        }
      })
      .catch((err) => {
        setStatus(false);

        setMessageUser("Error happened while register, please try again");
        console.log(err);
      });
  };
  const submit = () => {

    axios
      .get(`http://localhost:5000/user/${email}`)
      .then((result) => {
        if (result.data.result.length !== 0) {
          setMessageUser("This email is already exist");
          return;
        }

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
              <h3>
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
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Name
                      </h3>
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Email
                      </h3>
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Country
                      </h3>
                      <h3 className="h3">
                        {" "}
                        <label className="star">*</label> Password
                      </h3>
                    </div>
                    <div className="regstierinputs">
                      <div className="name_user">
                        <input
                          className="inputregstier"
                          type="text"
                          placeholder="User Name"
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="email_user">
                        <input
                          className="inputregstier"
                          type="text"
                          placeholder="E_mail"
                          required
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="country_user">
                        <select
                          className="regstierinputs"
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

                      <div className="password_user">
                        <input
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
          </div>
          <div className="Register">
            <button onClick={()=>{
              submit()
            }}>Register</button>
          </div>
        </div>
      ) : (
        <>
          <div className="titel_regester">
            {" "}
            <h1>verfied</h1>
          </div>
          <p>Enter the verfied code, it was send to your email</p>
          <input
            maxLength={6}
            onChange={(e) => {
              setCompareWord(e.target.value);
            }}
          />
          <button
            onClick={() => {
              verfiedClick();
            }}
          >
            Verfied email
          </button>
          <div className="message_user">
            <h1>{messageUser}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export { REGISTER };
