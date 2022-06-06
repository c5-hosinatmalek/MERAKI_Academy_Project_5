// import React from "react";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import "./style.css";
import { Link } from "react-router-dom";
import {BsFacebook} from "react-icons/bs";
import {SiGmail} from "react-icons/si";
import {FaInstagramSquare} from "react-icons/fa";
import {FaMapMarkerAlt} from "react-icons/fa";
import {BsFillTelephoneInboundFill} from "react-icons/bs";
import {MdEmail} from "react-icons/md";



const FOOTER=()=>{
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_uq7s3w5', 'template_iy2hv8o', form.current, 'ghDvvK363ERZHeuEk')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
         
      };
   


    return(
    <div className="container_footer">
        <footer>
        <div className="main-content">
                    <div className="left_box">
                        <h2>About Us</h2>
                        <div className="content">
                            <p>A site specializing in the sale and purchase of all computers, accessories, printers, and supplying all required equipment</p>
                            <div className="social">
                                 <Link to={"/"} > <span> <BsFacebook/></span></Link>
                                 <Link to={"/"} > <span><SiGmail/></span> </Link>
                                 <Link to={"/"} > <span><FaInstagramSquare/></span> </Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className="center_box">
                    <h2>address</h2>
                    <div className="content_center" >
                    <div className="email"> <span><MdEmail/></span>
                            <span>mmmm@gmail.com</span>
                         </div>
                         <div className="phone"> <span><BsFillTelephoneInboundFill/></span>
                            <span>+90777281558</span>
                         </div>
                        

                         <div className="place"> <span><FaMapMarkerAlt/></span>
                            <span>amman</span>
                         </div>
                    </div>

                    </div>
                    <div className="right_box" >
                        <h2>contact us</h2>
                        <div className="content">
                            <form ref={form} onSubmit={sendEmail} >
                            <div className="email">
                                  
                                  <input type="text" placeholder="enter email...." required name='user_name' />

                                  
                              </div>
                                <div className="email">
                                  
                                    <input type="email" placeholder="enter email...." required name='user_email' />

                                    
                                </div>
                                <div className="text_area" >
                                    
                                <textarea placeholder="enter message...." type="text" cols="25" rows="2"  required name='message' />
                                </div>


                                <div className="btn" >
                                    <button name='submit'>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        </footer>

    </div>
    )
}

export default FOOTER



