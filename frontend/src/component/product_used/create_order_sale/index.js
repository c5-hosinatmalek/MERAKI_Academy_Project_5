import React, { useEffect, useState,useRef } from "react";
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
    const ninbut=useRef()
    const pinbut=useRef()
    const binbut=useRef()
    const phoinbut=useRef()
    const catinbut=useRef()
    const upinbut=useRef()
    const desinput=useRef()
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
      ninbut.current.focus()
    },[])


    return(
        <div className="contener_ordersale">
           <div className="Salesorderfilling">
            <h1><span>*</span> Sales order filling guide</h1>
            <p><span>1.</span>Name product: The name of the product to be sold with model number,if any.</p>
            <p><span>2.</span>Asking Price: The price should be reasonable and in the jordanian currency.</p>
            <p><span>3.</span>Bank account: It must be an active bank account number,and if the request is accepted, the money will be sent to the same account.  </p>
            <p><span>4.</span>Category:We only buy products in the listed categories. </p>
            <p><span>5.</span>Image for the product: You must choose a clear picture of the product.</p>
            <p><span>6.</span>Description of the product: An accurate and complete description of the product must be written.</p>
            
           </div>
            <div className="form_ordersale" >
                
                <div className="productused_name" >
                    <label>Name product</label>
                    <input onKeyDown={(e)=>{
                      e.key=="Enter"?pinbut.current.focus(): ninbut.current.focus()
                    }} ref={ninbut} placeholder="Example_hard disk" onChange={(e)=>{setProduct_name(e.target.value)}}  />
                </div>
              
                <div className="asking_price">
                    <label>Asking Price</label>
                    <input onKeyDown={(e)=>{
                      e.key==="Enter"?binbut.current.focus():pinbut.current.focus()
                    }} ref={pinbut} onChange={(e)=>{setAsking_price(e.target.value)}} placeholder="Example_20 JD"/>
                </div>
                <div className=" bank_account">
                    <label>Bank account</label>
                    <input onKeyDown={(e)=>{
                      e.key==="Enter"?phoinbut.current.focus():binbut.current.focus()
                    }} ref={binbut} placeholder="Bank account" onChange={(e)=>{setbank_account(e.target.value)}} />
                </div>
                <div className="phone_number">
                    <label>Phone number</label>
                    <input  onKeyDown={(e)=>{
                      e.key==="Enter"?catinbut.current.focus():phoinbut.current.focus()
                    }}  ref={phoinbut} placeholder="Phone number" onChange={(e)=>{setphone_number(e.target.value)}} />
                </div>
                <div className="category_select">
                    <label >Category</label>
                    <select onKeyDown={(e)=>{
                      e.key==="Enter"?upinbut.current.focus():catinbut.current.focus()
                      
                    }} ref={catinbut} onChange={(e)=>{setCategory(e.target.value)
                      upinbut.current.focus()}} >
                        <option ></option>
                        <option value="hard ware">hard ware</option>

                        <option value="pc">pc</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Accessories">Accessories</option>

                        <option value="hard ware">hard ware</option>
                        

                    </select>
                </div>
                
                <div className="img_url_contener" >
                    <label> Image for the product</label>
                    <input ref={upinbut} type="file" onChange={(e)=>{setimage(e.target.files[0])
                    desinput.current.focus()
                    }} />
                </div>
                <div className="product_used_description">
                    <label>Description </label>
                    <textarea  ref={desinput} onChange={(e)=>{setProduct_Description(e.target.value)}} placeholder="Description" />
                </div>
                
                <div className="sen_buttoun" ><button onClick={submit} >Send</button></div>
                <div className="message_user" >  <h1>{message}</h1> </div>
            </div>
        </div>
    )
}


export default ORDERSALE

