import React from "react";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { setAllProductUsed } from "../../../redux/reducers/prduct_used";
const ALLPRODUCTUSED=()=>{
    const [message,setMessage]=useState("")
const dispacth=useDispatch()
const state=useSelector((state)=>{
    return{
        allproduct:state.product_used.allproductused
    }
})

const getAllProductUsed=()=>{
    axios.get("http://localhost:5000/prudect_used/allproductused").then((result)=>{
        
        dispacth(setAllProductUsed(result.data.result))
    })

}
useEffect(()=>{
    getAllProductUsed()
},[])






    return(
        <div className="all_oroduct_used">
            <div className="consent_massege_and_category">
                <div> <h1>{message}</h1> </div>    
                <div className="content_select"><select></select></div>
                           
            </div>

            <div className="content_all_productused">
                {
                    state.allproduct&& state.allproduct.map((element)=>{
                        
                    })
                }

            </div>

        </div>
    )
}

export default ALLPRODUCTUSED