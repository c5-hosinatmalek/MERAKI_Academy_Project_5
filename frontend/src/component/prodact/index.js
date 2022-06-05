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
    <div>
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
  );
};

export default GetProdact;
