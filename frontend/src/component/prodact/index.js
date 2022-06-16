import React, { useEffect, useState } from "react";
import { addcatogre } from "../../redux/reducers/prodact";
import { useParams, Link } from "react-router-dom";
import { getnumber } from "../../redux/reducers/prodact";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../redux/reducers/prodact";
import { getSubCategory } from "../../redux/reducers/catogre";

import axios from "axios";

import "./style.css";

const GetProdact = () => {
  const dispacth = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      prodect: state.product.product,
      number: state.product.number,
      sub_category: state.catogre.subCategory,
      subCatgoryProduct: state.product.subCatgoryProduct,
    };
  });
  const [show, setShow] = useState(state.prodect);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const products = async (string) => {
    await axios
      .post(`http://localhost:5000/product/subcatogre/${string}`, { id: id })
      .then((result) => {
        dispacth(getproduct(result.data.result));
        setShow(result.data.result);
        setMessage("All Products ");
        console.log(result.data.result);
        setTitle(result.data.result[0].category);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sub_category = () => {
    axios
      .get(`http://localhost:5000/sub_category/${id}`)
      .then((result) => {
        dispacth(getSubCategory(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/category/${id}/products`)
      .then((result) => {
        dispacth(addcatogre(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    products(1);
    sub_category();

    dispacth(getnumber());
  }, [id]);

  return (
    <div className="container_page">
      <div className="subCategory">
        <h1 className="subcatgoryTitleProduct">{title}</h1>
        <div className="subDiv">
          {state.sub_category &&
            state.sub_category.map((element, index) => {
              return (
                <div className="subImgDiv">
                  <Link
                    to={`/subCategory/${element.subCategory_id}`}
                    className="subImgDiv"
                  >
                    <img
                      key={index + "img"}
                      src={`${element.picUrlSub}`}
                      className="subCategoryImg"
                    />
                    <p key={index} className="parSub">
                      {element.sub_category}
                    </p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className="side_bar">
        <div className="orderby_price">
          <h3 className="sortHeader">Sort By </h3>
          <select
            className="dropList"
            onChange={(e) => {
              if (e.target.value === "the least") {
                axios
                  .get(`http://localhost:5000/product/ascending/all/${id}`)
                  .then((result) => {
                    setShow(result.data.result);
                    setMessage("Sorted from low-price to high-price ");
                  });
              } else if (e.target.value === "the above") {
                axios
                  .get(`http://localhost:5000/product/descending/all/${id}`)
                  .then((result) => {
                    setShow(result.data.result);
                    setMessage("Sorted from high-price to low-price ");
                  });
              }
              if (e.target.value === "A-TO-Z") {
                axios
                  .get(`http://localhost:5000/product/ByLetters/all/${id}`)
                  .then((result) => {
                    setShow(result.data.result);
                    setMessage("Sorted from A to Z ");
                  });
              } else {
                setShow(state.prodect);
                setMessage("All Products ");
              }
            }}
          >
            <option>None</option>
            <option value={"the least"}>low-price to high-price</option>
            <option value={"the above"}>high-price to low-price</option>
            <option value={"A-TO-Z"}>A-Z</option>
          </select>
        </div>
      </div>
      <div className="showProduct">
        <h1 className="headerProduct">{message}</h1>
        <div className="All_Product">
          {show &&
            show.map((element, index) => {
              return (
                <div className="productDiv">
                  <Link
                    to={`/category/product/${element.product_id}`}
                    key={index}
                    className="linkProduct"
                  >
                    <img className="productImg" src={element.picUrlProd}></img>
                    <p className="titlePar"> {element.title}</p>
                    <p className="descriptionPar">
                      {" "}
                      {element.description.split(" ").slice(1, 15).join(" ")}...
                    </p>

                    <p className="pricePar"> {element.price} JD</p>
                  </Link>
                </div>
              );
            })}
          
        </div>
       <div className="number_page" >
       {state.number &&
            state.number.map((element) => {
              console.log(element);
              return (
                <div className="divPagination">
                 
                  <button
                    key={element}
                    onClick={() => {
                      products(element);
                    }}
                  >
                    {element}
                  </button>
                  
                </div>
              );
            })}
       </div>
      </div>
      
    </div>
  );
};

export default GetProdact;
