import React from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneproductused } from "../../../redux/reducers/prduct_used";
import { useParams } from "react-router-dom";
import "./style.css"
const ONEPRODUCTUSED=()=>{
    const id=useParams()
    const dispacth=useDispatch()
    const state = useSelector((state) => {
      
        return {
          productused:state.product_used.oneproductused
         
        };
      });

      const getOneProduct=()=>{
        axios.get(`http://localhost:5000/prudect_used/productdetails/${id.id}`).then((result)=>{
            dispacth(setOneproductused(result.data.result))
            console.log(result.data.result);
            console.log(state.productused[0]);
      })
      }

      useEffect(()=>{
        getOneProduct()
      },[id])


    return(
        <div className="contener_one_product_used">
           
               
                 {state.productused&&state.productused.map((element)=>{
                    return(
                        <div className="content_one_product">
                        <div className="content_img">
                            <img src={`${element.url_imj}`}/>
                        </div>
                        <div className="all_ditels">
                            <div className="h1_titel" >
                                <h1>{element.product_name}</h1>
                            </div>
                            <div className="p_discribtion">
                                <p>{element.product_description}</p>
                            </div>
                            <div className="h1_price">
                                <h>{element.asking_price}</h>
                            </div>

                        </div>
                        <div className="content_add_cart">
                            <button>Add Caret</button>
                        </div>
                        </div>
                    )
                 })
                   
                 }
              
                
           


        </div>
    )
}

export default ONEPRODUCTUSED