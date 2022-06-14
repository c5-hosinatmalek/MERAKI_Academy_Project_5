import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { paginationAction } from "../../../redux/reducers/paginishon/index";
const PAGEAllRESULTSEARCH = () => {
  const dispacth = useDispatch();
  const resulatsarch = useSelector((state) => {
    return {
      resulatsarch: state.search.resultSerch,
      stateserch: state.search.stateserch,
      messageSearche: state.search.messageSearche,
      productAfterPagtion: state.pagination.productAfterPagtion,
      number: state.pagination.number,
    };
  });
  useEffect(() => {
    dispacth(paginationAction([resulatsarch.resulatsarch, 0,0]));
  }, [resulatsarch.resulatsarch]);
  const numberClick = (number) => {
    dispacth(paginationAction([resulatsarch.resulatsarch, number]));
  };

  return (
    <div className="all_result_search">
      <h1>{resulatsarch.messageSearche}</h1>
      <div className="continer_all_result">
        {resulatsarch.productAfterPagtion &&
          resulatsarch.productAfterPagtion.map((resulat, index) => {
            return (
              <Link
                to={`/category/product/${resulat.product_id}`}
                key={index}
                className="linkProduct"
              >
                <div className="one_result">
                  <img src={resulat.picUrlProd} className="img_result" />
                  <p className="titlePar">{resulat.title}</p>
                  <p className="descriptionPar">
                    {" "}
                    {resulat.description.split(" ").slice(1, 15).join(" ")}...
                  </p>

                  <p className="pricePar">{resulat.price}JD</p>
                </div>
              </Link>
            );
          })}
      </div>
      <div>
        {resulatsarch.number &&
          resulatsarch.number.map((element, index) => {
            return (
              <button key={index}
                onClick={() => {
                  numberClick(index );
                }}
              >
                {index + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default PAGEAllRESULTSEARCH;
