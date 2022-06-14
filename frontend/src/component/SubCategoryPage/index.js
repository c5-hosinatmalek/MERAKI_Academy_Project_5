import axios from "axios";
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

    axios
      .post(`http://localhost:5000/product/subcatogre/1`)
      .then((result) => {
        console.log(result);
        dispatch(subCatgorypagination());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>{title}</h1>

      {state.subCatgoryProduct &&
        state.subCatgoryProduct.map((element, index) => {
          return (
            <div className="productdivSub">
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
      {state.Pagination &&
        state.Pagination.map((element) => {
          return (
            <div className="contener_one_product">
              <Link
                className="linkproduct_mainpage"
                to={`/category/product/${element.product_id}`}
              >
                <img className="firstpageimg" src={element.picUrlProd} />
                <p className="titleproduct_main">{element.title}</p>

                <p className="dis_product_main">
                  {" "}
                  {element.description.split(" ").splice(1, 15).join(" ")}{" "}
                </p>
                <p className="price_productmain">{element.price} JD</p>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export { SubCatgoryPage };
