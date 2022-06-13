import React from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneproductused } from "../../redux/reducers/prduct_used";
const ONEPRODUCTUSED=()=>{
    const state = useSelector((state) => {
        return {
          productused:state.product_used.oneproductused,
         
        };
      });

      const getOneProduct=()=>{
        axios.get(`http://localhost:500/prudect_used/productdetails/${id}`).then((result)=>{
            dispatch(setOneproductused(result.data.result))
      })
      }




    return(
        <div className="contener_one_product_used">


        </div>
    )
}

export default ONEPRODUCTUSED