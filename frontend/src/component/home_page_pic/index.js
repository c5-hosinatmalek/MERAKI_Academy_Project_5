import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHomeItems } from "../../redux/reducers/homepage";
import "react-slideshow-image/dist/styles.css";
import {
  updateslide,
  addtoslide,
  deleteslide,
} from "../../redux/reducers/homepage";
import { Slide } from "react-slideshow-image";
import "./style.css";
import axios from "axios";
function Getphotosmain() {
  let counter = 0;
  const [product_Id, setproduct_Id] = useState(0);
  const [addimg, setAddimg] = useState(0);
  const dispatch = useDispatch();
  const properties = {
    duration: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: "autoplay",
    indicators: true,
  };

  const state = useSelector((state) => {
    return {
      state: state.search.allPrudact,
      home: state.home.homePageItems,
    };
  });
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const getHomePagePhoto = () => {
    axios
      .get(`http://localhost:5000/Homeiteams`)
      .then((resulat) => {
        dispatch(setHomeItems(resulat.data.resul));
      })
      .catch((err) => {});
  };

  const deleteslid = (id) => {
    axios
      .delete(`http://localhost:5000/Homeiteams/${id}`)
      .then((result) => {})
      .catch((err) => {});
  };

  const addImage = (method, http, id) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Data Pirates");
    data.append("cloud_name", "doxxh3kej");
    fetch("https://api.cloudinary.com/v1_1/doxxh3kej/image/upload", {
      method: method,
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        axios(http, {
          method: method,
          data: {
            url: data.url,
            product_Id: id,
          },
        })
          .then((resulat) => {
            if (method === "put") {
              dispatch(
                updateslide({
                  id: resulat.data.id,
                  product_Id: product_Id,
                  url: data.url,
                })
              );
            } else {
              dispatch(
                addtoslide({
                  pic_id: resulat.data.result.insertId,
                  url: resulat.data.url,
                  product_Id: resulat.data.id,
                })
              );
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getHomePagePhoto();
  }, []);

  const filterdSubCatag = (type1) => {
    console.log();
    const fortest =
      state.state &&
      state.state.map((element, index) => {
        if (element.subCategory_id == type1) {
          counter = counter + 1;
          return (
            <div key={index}>
              <img className="productimg" src={element.picUrlProd} />
            </div>
          );
        }
      });
    counter = 0;
    return fortest.sort().slice(0, 4);
  };
  return (
    <div>
        <h1 className="titleSlider">Create Slider</h1>
      <div>
        <label for="sliderMainImg" className="sliderLabel">Choose slider main image</label>
        <input
        id="sliderMainImg"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <label for="catgeorySlider" className="sliderLabel">Choose sub category for slider</label>
        <select
        id="catgeorySlider"
          onChange={(e) => {
            setAddimg(e.target.value);
          }}
        >
          <option>add catogrer</option>
          <option value={1}>CPU & Processor</option>
          <option value={2}>Storage Drive</option>
          <option value={3}>Laser Printer</option>
          <option value={4}>Memory - RAM</option>
          <option value={5}>Graphic Card</option>
          <option value={6}>Power Supply</option>
          <option value={7}>Motherboard</option>
          <option value={8}>Cooling</option>
          <option value={9}>Cases</option>
          <option value={10}>Scanner</option>
        </select>
        <button className="uploadBottom"
          onClick={() => {
            addImage("post", `http://localhost:5000/Homeiteams/${addimg}`);
          }}
        >
          Upload
        </button>
      </div>


      {state.home &&
        state.home.map((element, index) => {
          return (
            
                <div className="iteamsheader">
                  <div className="mainphotodiv">
                    <h1>Slider main Image</h1>
                    <img className="pageimg" src={element.url}></img>{" "}
                  </div>
                  <div className="mainiteamsheader">
                    <h1>Subcategory slider</h1>
                    <div className="mm">
                      <h1>{filterdSubCatag(element.product_Id)}</h1>
                    </div>
                  </div>
                  <div className="changeheader">
                    <label for="updatePhoto" className="updatesliderLabel">Update slider main image</label>
                    <input
                    className="updateInput"
                    id="updatePhoto"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                    <label for="updateCategory" className="updatesliderLabel">Update sub category for slider</label>
                    <select
                    className="updateInput"
                    id="updateCategory"
                      onChange={(e) => {
                        setproduct_Id(e.target.value);
                      }}
                    >
                      <option>add catogrer</option>
                      <option value={1}>CPU & Processor</option>
                      <option value={2}>Storage Drive</option>
                      <option value={3}>Laser Printer</option>
                      <option value={4}>Memory - RAM</option>
                      <option value={5}>Graphic Card</option>
                      <option value={6}>Power Supply</option>
                      <option value={7}>Motherboard</option>
                      <option value={10}>Scanner</option>
                      <option value={8}>Cooling</option>
                      <option value={9}>Cases</option>
                    </select>
                    <button className="updateButton"
                      onClick={() => {
                        addImage(
                          "put",
                          `http://localhost:5000/Homeiteams/${element.pic_id}`,
                          product_Id
                        );
                      }}
                    >
                      update
                    </button>
                    <button
                    className="updateButton"
                      onClick={() => {
                        deleteslid(element.pic_id);
                        dispatch(deleteslide(element.pic_id));
                      }}
                    >
                      {" "}
                      delete
                    </button>
                  </div>
                </div>
               
             
          );
        })}
    </div>
  );
}

export default Getphotosmain;
