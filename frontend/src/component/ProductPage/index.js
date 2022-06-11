import "./style.css";

import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getproduct } from "../../redux/reducers/prodact";
import { useDispatch, useSelector } from "react-redux";
const ProductPage = () => {
  const [message, setMessage] = useState("")
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      product: state.product.product,
      token: state.auth.token,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        
        dispatch(getproduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addCartClick = (id) => {
    
    axios
      .post(`http://localhost:5000/cart/add/${id}`,{}, {headers:{
        authorization: `Bearer ${state.token}`,
      },})
      .then((result) => {
        setMessage("Your Item has been added")
        setTimeout(()=>{
          setMessage("")
        },3000)
        console.log(result);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  // ==========================================
  

  return (
    <div className="mainproductPage">
    <div className="productPage">
      <div className="childproductPage">
        <h2>{state.product[0] && state.product[0].title}</h2>
        
        <p className="prodactdetalis">{state.product[0] && state.product[0].description.split(",").map((element,index)=>{return <ul key={index}><li className="lidescrption" key={index + "li"}>-{element}</li></ul>})}</p>
        <div className="prodactphoto">
        <img src={`${state.product[0] && state.product[0].picUrlProd}`} className="imgProduct" />
        </div>
      </div>
      <div className="parentpriceAvilability">
        <div className="priceAvilability">
          <h2>JOD {state.product[0] && state.product[0].price},00</h2>
              <div className="detalis">
            <p>
             Availability:
              <span className="stock"> {state.product[0] && state.product[0].Store_Quantity == 0
                ? "Out of Stock"
                : "In Stock"}</span>
            </p>
            {console.log(state.product[0].product_type)}
            <p>Brand: <span className="Brand">{state.product[0].product_type}</span></p>
          </div>
        </div>
        <div className="addtocartdiv">
        {state.product[0] && state.product[0].Store_Quantity == 0 ? (
          <p>Out of Stock</p>
          ) : (<>
          <button
          className="addtocart"
            onClick={() => {
              console.log(false);
              addCartClick(state.product[0].product_id);
            }}
            >
            Add to cart
          </button>
        </>
        )}
        </div>
      </div>
    </div>
    </div>

  );
};

export {ProductPage}