import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "./style.css";
import axios from "axios";
function Getphotosmain() {
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
    };
  });
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [test, setTest] = useState("");
  const getHomePagePhoto = () => {
    axios
      .get(`http://localhost:5000/Homeiteams`)
      .then((resulat) => {
        setTest(resulat.data.resul);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addImage = (method, http, id) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Data Pirates");
    data.append("cloud_name", "doxxh3kej");
    fetch("https://api.cloudinary.com/v1_1/doxxh3kej/image/upload", {
      method: "post",
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
            console.log(resulat);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHomePagePhoto();
  }, []);

  const filterdSubCatag = (type1) => {
    const fortest =
      state.state &&
      state.state.map((element, index) => {
        if (element.sub_category == type1) {
          console.log(element);
          return (
            <div>
              <img className="firstpageimg" src={element.picUrlProd} />
              <p>{element.title}</p>
              <p>{index}</p>
            </div>
          );
        }
      });
    console.log(fortest.sort().slice(0, 2));
    return fortest.sort().slice(0, 4);
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button
          onClick={() => {
            addImage("post", `http://localhost:5000/Homeiteams/${9}`);
          }}
        >
          update
        </button>
      </div>
      {test &&
        test.map((element, index) => {
          return (
            <div>
              <div className="test">
                <img src={element.url}></img>
                <Slide {...properties} className="">
                  {" "}
                  {filterdSubCatag(element.product_Id)}
                </Slide>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Getphotosmain;
