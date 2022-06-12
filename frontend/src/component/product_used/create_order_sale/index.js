import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"
import { useSelector } from "react-redux";
const ORDERSALE=()=>{
    const [product_name,setProduct_name]=useState("")
    const [category,setCategory]=useState("")
    const [product_description,setProduct_Description]=useState("")
    const [image,setimage]=useState("")
    const [asking_price,setAsking_price]=useState("")
    const [bank_account,setbank_account]=useState("")
    const [phone_number,setphone_number]=useState("")
    const [message,setMessage]=useState("")

    const state = useSelector((state) => {
        return {
          cart: state.cart.cart,
          token: state.auth.token,
          totalPrice:state.cart.totalPrice
        };
      });
    const submit=(e)=>{
       



        e.preventDefault();


        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Data Pirates");
        data.append("cloud_name", "doxxh3kej");
        fetch("https://api.cloudinary.com/v1_1/doxxh3kej/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            // setUrl(data.url);
    
            axios
              .post("http://localhost:5000/prudect_used",{product_name,category,product_description,url_imj:data.url,asking_price,bank_account,phone_number},{
                headers: {
                  authorization: `Bearer ${state.token}`,
                }
              })
              .then((resulat) => {
                setMessage("send seccessfull");
              })
              .catch((err) => {
                setMessage("error ");
              });
          })
          .catch((err) => {
            console.log(err);
          });

    }



    useEffect(()=>{
        console.log(category);
    },[category])


    return(
        <div className="contener_ordersale">
           
            <form className="form_ordersale" onSubmit={submit} >
                <div className="productused_name" >
                    <label>name product</label>
                    <input placeholder="Example hard desk" onChange={(e)=>{setProduct_name(e.target.value)}}  />
                </div>
                <div className="category_select">
                    <label >choice category</label>
                    <select onChange={(e)=>{setCategory(e.target.value)}} >
                        <option ></option>
                        <option value="hard ware">hard ware</option>
                        <option value="hard ware">hard ware</option>
                        <option value="hard ware">hard ware</option>
                    </select>
                </div>
                <div className="product_used_description">
                    <label>description product</label>
                    <textarea onChange={(e)=>{setProduct_Description(e.target.value)}} placeholder="description product" />
                </div>
                <div className="img_url_contener" >
                    <label>choice img product</label>
                    <input type="file" onChange={(e)=>{setimage(e.target.files[0])}} />
                </div>
                <div className="asking_price">
                    <input onChange={(e)=>{setAsking_price(e.target.value)}} placeholder="asking price"/>
                </div>
                <div className=" bank_account">
                    <label>banck account</label>
                    <input placeholder="banck account" onChange={(e)=>{setbank_account(e.target.value)}} />
                </div>
                <div className="phone_number">
                    <label>phon number</label>
                    <input placeholder="phon number" onChange={(e)=>{setphone_number(e.target.value)}} />
                </div>
                <div className="sen_buttoun" ><button>send</button></div>
                <div className="message_user" >  <h1>{message}</h1> </div>
            </form>
        </div>
    )
}


export default ORDERSALE

