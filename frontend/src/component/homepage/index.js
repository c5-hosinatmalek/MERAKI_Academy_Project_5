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
import header6 from "./img/6.png";
const Homepage = () => {



  const [Pagination, setPagination] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      allproduct: state.search.allPrudact,
      number: state.search.number,
    };
  });

  const properties = {
    duration: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: "autoplay",
    indicators: true,
  };

  const filterdCatagore = (type1) => {
    const fortest =
      state.allproduct &&
      state.allproduct.filter((element) => {
        return element.sub_category == type1 || element.product_name === type1;
      });
    return fortest;
  };

  const filterdSubCatag = (type1) => {
    const fortest =
      state.allproduct &&
      state.allproduct.filter((element) => {
        return element.category_id == type1;
      });
    return fortest;
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

  let x = [        
    <Slide {...properties} className="test">
      {filterdCatagore(9).map((element) => {
        return (
          <div>
            <div className="each-slide">
              <img className="firstpageimg" src={element.picUrlProd} />
              <p>{element.title}</p>
            </div>
          </div>
        );
      })}
    </Slide>
  ]





  return (
    <div>
      <div className="mainhomediv">
        <div>
          <div>
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
          {/* this one for printers just add number (10)  */}
          <p>gpu</p>
          <Slide {...properties} className="test">
            {filterdCatagore(8).map((element) => {
              return (
                <div className="test2">
                  <div className="prodacthome">
                    <div className="">
                      <hr></hr>
                      <img className="firstpageimg" src={element.picUrlProd} />
                    </div>
                    <p className="titlehome">{element.title}</p>
                    <p className="titlehome"> {element.price} </p>
                  </div>
                </div>
              );
            })}
          </Slide>
        </div>
        {/* this one for ssdjust add string ("ssd") in 103 */}
        <img className="header2" src={header2} />
        <div>
          <Slide {...properties} className="test">
            {filterdCatagore(9).map((element) => {
              return (
                <div>
                  <div className="each-slide">
                    <img className="firstpageimg" src={element.picUrlProd} />
                    <p>{element.title}</p>
                  </div>
                </div>
              );
            })}
          </Slide>
        </div>
        <img className="header3" src={header6} />
        <div>
          {/* this one for power by asusu just add number 1 to params */}
          <Slide {...properties} className="test">
            {filterdSubCatag(2).map((element) => {
              return (
                <div>
                  <div className="each-slide">
                    <img className="firstpageimg" src={element.picUrlProd} />
                    <p>{element.title}</p>
                  </div>
                </div>
              );
            })}
          </Slide>
        </div>
        <img className="header3" src={header1} />

        <div>
          {/* this one for printers just add number (5)*/}
          <p>gpu</p>
          <Slide {...properties} className="test">
            {filterdCatagore(8).map((element) => {
              return (
                <div>
                  <div className="each-slide">
                    <img className="firstpageimg" src={element.picUrlProd} />
                    <p>{element.title}</p>
                  </div>
                </div>
              );
            })}
          </Slide>


 
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
