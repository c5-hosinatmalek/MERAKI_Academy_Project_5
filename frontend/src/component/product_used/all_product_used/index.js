import React from "react";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import "./style.css"
import { setAllProductUsed } from "../../../redux/reducers/prduct_used";

import { Link } from "react-router-dom";
const ALLPRODUCTUSED=()=>{
    const [message,setMessage]=useState("")
    const [category,setCategory]=useState("")
const dispacth=useDispatch()
const state=useSelector((state)=>{
    return{
      
        allproduct:state.product_used.allproductused
    }
})

const getAllProductUsed=()=>{
    axios.get("http://localhost:5000/prudect_used/allproductused").then((result)=>{
        
        setMessage(result.data.message)
        dispacth(setAllProductUsed(result.data.result))
    })

}

 const getAllProductBYCategory=()=>{
    axios.get(`http://localhost:5000/prudect_used/productbycategory/${category}`).then((result)=>{
        console.log(result);
        setMessage(result.data.message)
        dispacth(setAllProductUsed(result.data.result))
    })

 }

useEffect(()=>{
    if(!category){
        getAllProductUsed()
    }else if(category==="ALL Produc"){
        getAllProductUsed()
    }else{
        getAllProductBYCategory()
       
    }
  
},[category])






    return(
        <div className="all_oroduct_used">
            <div className="consent_massege_and_category">
                <div> <h1>{message}</h1> </div>    
                <div className="content_select">
                    <label>category  </label>
                    <select onChange={(e)=>{setCategory(e.target.value)}}>
                        <option></option>
                        <option value="ALL Produc" >ALL Produc</option>
                        <option value="hard ware">hard ware</option>
                        <option value="pc">pc</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    </div>
                           
            </div>

            <div className="content_all_productused">
                {
                    state.allproduct&& state.allproduct.map((element,index)=>{
                        return(
                        <div className="one_product_used">
                        <Link
                          to={`/one_product_used/${element.used_product_id}`}
                          key={index}
                          className="link_Product_used"
                        >
                          <img className="product_used_Img" src={element.url_imj}></img>
                          <p className="titlePar_product_used"> {element.product_name}</p>
                          <p className="descriptionPar_used">
                            {" "}
                            {element.product_description.split(" ").slice(0,15).join(" ")}
                          </p>
      
                          <p className="price_product_used"> {element.asking_price +20 } JD</p>
                        </Link>
                      </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default ALLPRODUCTUSED