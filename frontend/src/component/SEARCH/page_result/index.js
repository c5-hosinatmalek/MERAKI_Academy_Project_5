import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

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
              <div className="one_result">
                <div className="img_result">
                  <img src={resulat.picUrlProd} />
                </div>
                <div className="one_dis_price">
                  <h3>{resulat.title}</h3>
                  <h4>price:{resulat.price}JD</h4>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default PAGEAllRESULTSEARCH;
