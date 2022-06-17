import axios from "axios";
import "./style.css"
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { subCatgorypagination } from "../../redux/reducers/paginishon";
import { useSelector, useDispatch } from "react-redux";
import { getProductBysubCategoryAction } from "../../redux/reducers/prodact";

const SubCatgoryPage = () => {
  const { subCategory_id } = useParams();

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const state = useSelector((state) => {
    return {
      subCatgoryProduct: state.product.subCatgoryProduct,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/sub_category/${subCategory_id}/products`)
      .then((result) => {
        console.log(result.data.result);
        dispatch(getProductBysubCategoryAction(result.data.result));
        setTitle(result.data.result[0].sub_category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
    <h1 className="type">{title}</h1>
    <div className="mainnproductdivSub">
      {state.subCatgoryProduct &&
        state.subCatgoryProduct.map((element, index) => {
          console.log(element);
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
  );
};

export { SubCatgoryPage };
