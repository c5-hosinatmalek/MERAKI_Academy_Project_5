import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getfury } from "../../redux/reducers/search";
import "react-slideshow-image/dist/styles.css";
import "./style.css";
import header1 from "./img/1.png";
import header2 from "./img/2.jpg";
import header3 from "./img/3.jpg";
import header4 from "./img/4.png";
import header5 from "./img/5.png";
const Homepage = () => {
  const [Pagination, setPagination] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      allproduct: state.search.allPrudact,
      number: state.search.number,
      state: state.search.allPrudact,
      home: state.home.homePageItems,
    };
  });
  const filterdSubCatag = (type1) => {
    const fortest =
      state.state &&
      state.state.map((element, index) => {
        if (element.subCategory_id == type1) {
          return (
            <div key={index}>
              <img className="productimg" src={element.picUrlProd} />
            </div>
          );
        }
      });
    return fortest;
  };
  const properties = {
    duration: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: "autoplay",
    indicators: true,
  };
  const getproductPagination = (string) => {
    axios
      .post(`http://localhost:5000/product/Pagination/${string}`)
      .then((result) => {
        setPagination(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getproductPagination(1);
  }, []);
  console.log(state.home);
  return (
    <div className="continerAll_mainhomediv">
      <div className="mainhomediv">
        <div>
          <div className="continerAll_img_page">
            <img
              src={header4}
              onClick={() => {
                dispatch(getfury());
                navigate("/resulsearch");
              }}
            />
          </div>
          <Slide easing="ease">
            <div className="each-slide">
              <img className="img" src={header1} />
            </div>
            <div className="each-slide">
              <img className="img" src={header2} />
            </div>
            <div className="each-slide">
              <img className="img" src={header3} />
            </div>
            <div className="each-slide">
              <img className="img" src={header5} />
            </div>
          </Slide>
        </div>
        <div>
          {state.home &&
            state.home.map((element, index) => {
              console.log(element);
              return (
                <div>
                  <div id={index}>
                    <img src={element.url}></img>
                    <Slide {...properties} className="">
                      {" "}
                      {filterdSubCatag(element.product_Id)}
                    </Slide>
                  </div>
                </div>
              );
            })}
          {Pagination &&
            Pagination.map((element) => {
              return (
                <div>
                  <p>{element.title}</p>
                  <img className="firstpageimg" src={element.picUrlProd} />
                  <p>
                    {" "}
                    {element.description
                      .split(" ")
                      .splice(1, 15)
                      .join(" ")}{" "}
                  </p>
                  <p>{element.price}</p>
                </div>
              );
            })}
        </div>
      </div>
      {state.number &&
        state.number.map((element) => {
          return (
            <div className="divPagination">
              {" "}
              <button
                key={element}
                onClick={() => {
                  getproductPagination(element);
                }}
              >
                {element}
              </button>
              ;
            </div>
          );
        })}
    </div>
  );
};

export default Homepage;
