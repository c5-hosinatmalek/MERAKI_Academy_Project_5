import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../redux/reducers/prodact";

import axios from "axios";

import "./style.css";
const GetProdact = () => {
  const dispacth = useDispatch();
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      prodect: state.product.product,
    };
  });

  const test = async () => {
    await axios
      .get(`http://localhost:5000/category/${id}/products`)
      .then((resulat) => {
        dispacth(getproduct(resulat.data));
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    test();
  }, [id]);

  return (
    <div className="container_page" >
      <div className="side_bar" >
        <div className="orderby_price">
            <h1>Sorte By price</h1>
            <select   onChange={(e)=>{
                       
                      if(e.target.value==="the least"){ axios.get(`http://localhost:5000/product/ascending/all/${id}`).then((resulat)=>{
                      
                        dispacth(getproduct(resulat.data));
                      
                      })}else{

                        axios.get(`http://localhost:5000/product/descending/all/${id}`).then((resulat)=>{
                        dispacth(getproduct(resulat.data));
                       
                      })
                      }
                 
                }}>
              <option value={"the least"}>
                the least
              </option>
              <option value={"the above"}>
              the above
              </option>
            </select>
        </div>
        <div className="orderby_letter">
            <h1>Sorte By Alphabet</h1>
            <select onChange={(e)=>{
               if(e.target.value==="A-to-z"){ axios.get(`http://localhost:5000/product/ByLetters/all/${id}`).then((resulat)=>{
                      
                dispacth(getproduct(resulat.data));
              
              })}
            }} >
              <option>
                <button>A-to-z</button>
              </option>
            </select>
        </div>
      </div>
       <div className="ALL_BRODUCT">
      {state.prodect.result &&
        state.prodect.result.map((element, index) => {
          
          return (
            <div>
              <Link to={`/category/product/${element.product_id}`} key={index}>
                <p> title : {element.title}</p>
                <img className="prodactpichter" src={element.picUrlProd}></img>
                <p>
                  {" "}
                  description: {element.description.split(" ").slice(1, 15)}
                </p>
                <p> type : {element.product_type}</p>
                <p> price : {element.price}</p>
              </Link>
            </div>
          );
        })}
    </div>
    </div>
   
  );
};

export default GetProdact;
