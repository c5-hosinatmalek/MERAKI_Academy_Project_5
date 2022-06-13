import React from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneproductused } from "../../../redux/reducers/prduct_used";
import { useParams } from "react-router-dom";
const ONEPRODUCTUSED=()=>{
    const id=useParams()
    const dispacth=useDispatch()
    const state = useSelector((state) => {
      
        return {
          productused:state.product_used.oneproductused,
         
        };
      });

      const getOneProduct=()=>{
        axios.get(`http://localhost:5000/prudect_used/productdetails/${id}`).then((result)=>{
            dispacth(setOneproductused(result.data.result))
            console.log(result);
      })
      }

      useEffect(()=>{
        getOneProduct()
      },[])


    return(
        <div className="contener_one_product_used">


        </div>
    )
}

export default ONEPRODUCTUSED