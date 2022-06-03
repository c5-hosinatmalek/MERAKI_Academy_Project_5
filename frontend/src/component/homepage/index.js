import React from "react";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      allproduct: state.search.allPrudact,
    };
  });

  const properties = {
    duration: 3000,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: "autoplay",
    indicators: true,
  };



  const filterd = (type1) => {
   const fortest= state.allproduct &&
      state.allproduct.filter((element) => {
          console.log(type1);
        console.log(element.sub_category==type1);
        return element.sub_category==type1
      });
      return fortest
  };

  return (
    <div>
      <div>
        <div>
          <img
            src={header4}
            onClick={() => {
              console.log(true);
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
          <p>gpu</p>
      <Slide {...properties} >
      {filterd(8).map((element)=>{
          console.log(element);
         return <div> 
             <div className="each-slide">
             <img className="firstpageimg" src={element.picUrlProd}/> 
             <p>{element.title}</p>
             </div>
             
             </div>
      })}
      </Slide>
      </div>
      <img className="header2" src={header2}/>
      <div>
      <Slide {...properties} >
      {filterd(9).map((element)=>{
          console.log(element);
         return <div> 
             <div className="each-slide">
             <img className="firstpageimg" src={element.picUrlProd}/> 
             <p>{element.title}</p>
             </div>
             
             </div>
      })}
      </Slide>
      </div>
      <img className="header3" src={header6} />
    </div>
  );
};

export default Homepage;
