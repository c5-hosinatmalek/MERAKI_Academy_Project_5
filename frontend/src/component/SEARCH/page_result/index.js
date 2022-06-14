import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const PAGEAllRESULTSEARCH = () => {
  const resulatsarch = useSelector((state) => {
    return {
      resulatsarch: state.search.resultSerch,
      stateserch: state.search.stateserch,
      messageSearche: state.search.messageSearche,
    };
  });

  return (
    <div className="all_result_search">
      <h1>{resulatsarch.messageSearche}</h1>
      <div className="continer_all_result">
        {resulatsarch.resulatsarch &&
          resulatsarch.resulatsarch.map((resulat, index) => {
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
    </div>
  );
};
export default PAGEAllRESULTSEARCH;
