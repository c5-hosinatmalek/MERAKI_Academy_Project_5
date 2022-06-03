import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setResultSerch, setStateSerch } from "../../redux/reducers/search";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SEARCH = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const resultSerch = useSelector((state) => {
    return {
      resultSerch: state.search.resultSerch,
      stateserch: state.search.stateserch,
    };
  });

  return (
    <div className="search_continer">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          dispacth(setResultSerch(e.target.value));
        }}
      />
      <button
        onClick={() => {
          navigate("/resulsearch");
          dispacth(setStateSerch(false));
        }}
      >
        Search
      </button>
      <div className="all_result">
        {resultSerch.stateserch ? (
          resultSerch.resultSerch &&
          resultSerch.resultSerch.map((result, index) => {
            if (index < 5) {
              return (
                <Link
                  to={`/category/product/${result.product_id}
                        `}
                >
                  <div className="continer_result">
                    <div className="img_product">
                      <img src={result.picUrlProd} />
                    </div>
                    <div className="nameAndprice_product">
                      <h3>{result.title}</h3>
                      <h4>price:{result.price}JD</h4>
                    </div>
                  </div>
                </Link>
              );
            }
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default SEARCH;
