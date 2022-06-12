import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import axios from "axios";

const ALLPRODUCTFORADMIN=()=>{
    const dispacth=useDispatch()

    useEffect(()=>{
        axios.get("http://localhost:5000/prudect_used/AllSaleOrderForadmin").then((resulat)=>{

        })
    },[])





    return(
        <div className="contener_all_product_for_admin">
            
        </div>
    )
}
export default ALLPRODUCTFORADMIN