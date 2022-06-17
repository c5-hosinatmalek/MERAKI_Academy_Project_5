import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setOneproductused } from "../../../redux/reducers/prduct_used";
import { useParams } from "react-router-dom";
import "./style.css";
const ONEPRODUCTUSED = () => {
  const id = useParams();
  const dispacth = useDispatch();
  const state = useSelector((state) => {
    console.log(state.auth.token);
    return {
      productused: state.product_used.oneproductused,
      token: state.auth.token,
    };
  });

  const getOneProduct = () => {
    axios
      .get(`http://localhost:5000/prudect_used/productdetails/${id.id}`)
      .then((result) => {
        dispacth(setOneproductused(result.data.result));
        console.log(result.data.result);
        console.log(state.productused[0]);
      });
  };

  useEffect(() => {
    getOneProduct();
  }, []);

  const add = (id) => {
    console.log(state.token);
    axios
      .post(`http://localhost:5000/cart/${id}`,{}, {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="contener_one_product_used">
      {state.productused &&
        state.productused.map((element) => {
          return (
            <div className="mainproductPage">
              <div className="productPage">
                <div className="childproductPage">
                  <h2>{element.product_name}</h2>

                  <p className="prodactdetalis">
                    {element.product_description}
                  </p>
                  <div className="prodactphoto">
                    <img src={`${element.url_imj}`} className="imgProduct" />
                  </div>
                </div>
                <div className="parentpriceAvilability">
                  <div className="priceAvilability">
                    <h2>JOD {element.asking_price},00</h2>
                    <div className="detalis">
                      <p>
                        category:{" "}
                        <span className="Brand">{element.category}</span>
                      </p>
                    </div>
                  </div>
                  <div className="addtocartdiv">
                    <button
                      className="addtocart"
                      onClick={() => {
                        console.log(false);
                        add(element.used_product_id);
                        
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ONEPRODUCTUSED;
