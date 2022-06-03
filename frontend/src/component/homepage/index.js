import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.css";
import header1 from "./img/1.png";
import header2 from "./img/2.jpg";
import header3 from "./img/3.jpg";
import header4 from "./img/4.png";
import header5 from "./img/5.png";

const Homepage = () => {
  return (
    <div>

      <div>
      <img src={header4}/>
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
    </div>
  );
};

export default Homepage;
