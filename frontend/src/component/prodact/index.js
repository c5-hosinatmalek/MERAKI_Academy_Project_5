import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getproduct,
  getProductbySubCategoryId,
} from "../../redux/reducers/prodact";
import { getSubCategory } from "../../redux/reducers/catogre";

import axios from "axios";

import "./style.css";

const GetProdact = () => {
  const dispacth = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      prodect: state.product.product,
      sub_category: state.catogre.subCategory,
      subCatgoryProduct: state.product.subCatgoryProduct,
    };
  });
  const [show, setShow] = useState(state.prodect);
  const [message, setMessage] = useState("");
  const [title,setTitle]=useState("")

  const products = async () => {
    await axios
      .get(`http://localhost:5000/category/${id}/products`)
      .then((result) => {
        dispacth(getproduct(result.data.result));
        setShow(result.data.result);
        setMessage("All Products ");
        console.log(result.data.result);
        setTitle(result.data.result[0].category)
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
    products();
    sub_category();
  }, [id]);

  const sub_categoryClick = (index) => {
    dispacth(
      getProductbySubCategoryId(state.sub_category[index].subCategory_id)
    );
    setShow(state.subCatgoryProduct);
  };

  return (
    <div className="container_page">
      <div className="subCategory">
        <h1 className="subcatgoryTitleProduct">{title}</h1>
        <div className="subDiv">

        {state.sub_category &&
          state.sub_category.map((element, index) => {
            return (<div className="subImgDiv">
            

            <img key={index+"img"} src={`${element.picUrlSub}`} className="subCategoryImg" onClick={() => {
                  sub_categoryClick(index);
                }}/>
              <p
                key={index}
                onClick={() => {
                  sub_categoryClick(index);
                }}
              className="parSub">
                {element.sub_category}
              </p>
                  </div>
                  );
                })}
                </div>
      </div>
      <div className="side_bar">
        <div className="orderby_price">
          <h3 className="sortHeader">Sort By </h3>
          <select
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
          {/* <div className="radio">
            <input type={"radio"} id="none" />
            <label for="none">None</label>
          </div>
          <div className="radio">
            <input type={"radio"} id="theleast" />
            <label for="theleast">low-price to high-price</label>
          </div>
          <div className="radio">
            <input type={"radio"} id="theabove" />
            <label for="theabove">high-price to low-price</label>
          </div>
          <div className="radio">
            <input type={"radio"} id="AtoZ" />
            <label for="AtoZ">A-Z</label>
          </div> */}
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
      </div>
    </div>
  );
};

export default GetProdact;
