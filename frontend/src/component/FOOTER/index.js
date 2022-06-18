// import React from "react";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./style.css";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaInstagramSquare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import {IoIosCheckmarkCircle} from "react-icons/io";


  
  const FOOTER = () => {
  const [clasNameicon,setClasNameicon]=useState("")
  const [classNameSend,setClassNameSend]=useState("")
  const nameinput=useRef()
  const emailinput=useRef()
  const textinput=useRef()
  // const form = useRef();
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_uq7s3w5",
  //       "template_iy2hv8o",
  //       form.current,
  //       "ghDvvK363ERZHeuEk"
  //     )
  //     .then(
  //       (result) => {},
  //       (error) => {}
  //     );
  // };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_uq7s3w5",
        "template_iy2hv8o",
        form.current,
        "ghDvvK363ERZHeuEk"
      )
      .then(
        (result) => {
           

          if(result.status==200){
            setTimeout(()=>{
              setClassNameSend("active")
              setClasNameicon("active")

            }, 100)

            setTimeout(()=>{
              setClassNameSend("")
              setClasNameicon("")

            }, 9000)
          }



        },
        (error) => {}
      );
  };

  return (
    <div className="main_content_footer">
      <footer>
        <div className="left_box">
          <h2>About Us</h2>
          <div className="content_description">
            <p>
              A site specializing in the sale and purchase of all computers,
              accessories, printers, and supplying all required equipment
            </p>
          </div>
          <div className="social">
            <Link to={"/"}>
              {" "}
              <span>
                {" "}
                <BsFacebook />
              </span>
            </Link>
            <Link to={"/"}>
              {" "}
              <span>
                <SiGmail />
              </span>{" "}
            </Link>
            <Link to={"/"}>
              {" "}
              <span>
                <FaInstagramSquare />
              </span>{" "}
            </Link>
          </div>
        </div>
        <div className="center_box">
                                 <h2>address</h2>
                <div className="content_center">
                    <div className="email">
                    {" "}
                    <span className="icon" >
                        <MdEmail />
                        </span>
                     <span>datapirates1996@gmail.com</span>
                     </div>
          </div>
          <div className="phone">
            {" "}
            <span className="icon">
              <BsFillTelephoneInboundFill  />
            </span>
            <span>+90777281558</span>
          </div>
          <div className="place">
            {" "}
            <span className="icon">
              <FaMapMarkerAlt />
            </span>
            <span>Amman</span>
          </div>
        </div>
        <div className="right_box">
          <h2>contact us</h2>
          <div className="content">
            <form ref={form} onSubmit={sendEmail}>
              <div className="name">
                  
                <input
                onKeyDown={(e)=>{
                  e.key==="Enter"?emailinput.current.focus():nameinput.current.focus()
                }}
                ref={nameinput}
                  type="text"
                  placeholder="enter name...."
                  required
                  name="user_name"
                />
              </div>
              <div className="email">
                <input
                onKeyDown={(e)=>{e.key==='Enter'?textinput.current.focus():emailinput.current.focus()}}
                ref={emailinput}
                  type="email"
                  placeholder="enter email...."
                  required
                  name="user_email"
                />
              </div>
              <div className="text_area">
                <textarea
                ref={textinput}
                  placeholder="enter message...."
                  type="text"
                  cols="25"
                  rows="2"
                  required
                  name="message"
                />
              </div>

              <div className="btn">
                <button className={`submit_send_email ${classNameSend}`}>Send</button>
               <h1 className={`righi_send ${clasNameicon}`}> <span className="righi_send_span"><IoIosCheckmarkCircle/></span>  Sent Successfully</h1>
              </div>
           
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FOOTER;


 
