import React, { useState, useEffect } from "react";

import axios from "axios";
const Addprodact = () => {
  const [mesage, setMesage] = useState("")
  const [catogre, setCatogre] = useState("");
  const [subcatogre, setSubcatogre] = useState("")
  const [sub_category, Setsub_category] = useState(1);
  const [cato, setCato] = useState(0)
  const [category_id, Setcategory_id] = useState(0);
  const [product_name, Setproduct_name] = useState("");
  const [product_type, Setproduct_type] = useState(1);
  const [description, Setdescription] = useState("");
  const [Store_Quantity, SetStore_Quantity] = useState(0);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [price, Setprice] = useState(0);
  const [title, Settitle] = useState("");

  const subcatogry = () => {
    axios
      .get("http://localhost:5000/sub_category")
      .then((result)=>{
        setSubcatogre(result.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallcarogre = () => {
    axios
      .get("http://localhost:5000/category")
      .then((result) => {
        setCatogre(result.data.result);
        console.log(catogre);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallcarogre();
    subcatogry()
  }, []);
  const uploadImage = () => {
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
        console.log(data.url);
        axios
          .post("http://localhost:5000/product/create", {
            picUrlProd:data.url,
            title,
            category_id:cato,
            sub_category:sub_category,
            product_name,
            product_type,
            price,
            description,
            Store_Quantity,
          })
          .then((resulat) => {
            console.log(resulat);
            setMesage("iteam has been add")
          })
          .catch((err) => {
            setMesage("error ")
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="addNewsChild">
        <textarea
          className="newsinput"
          placeholder="title"
          onChange={(e) => {
            Settitle(e.target.value);
          }}
        ></textarea>

        <textarea
          className="newsinput"
          placeholder="description"
          onChange={(e) => {
            Setdescription(e.target.value);
          }}
        ></textarea>

        <input
        placeholder="qun"
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="5"
          onChange={(e)=>{
            SetStore_Quantity(e.target.value)
          }}
        ></input>
        {}

        <input
                placeholder="name"
          onChange={(e) => {
            Setproduct_name(e.target.value);
          }}
        ></input>
        <input
                placeholder="type"
          onChange={(e) => {
            Setproduct_type(e.target.value);
          }}
        ></input>
        <input
        placeholder="price"
          onChange={(e) => {
            Setprice(e.target.value);
          }}
        ></input>
        <select
          onChange={(e) => {
            setCato(e.target.value);
          }}
        >
          {catogre &&
            catogre.map((element, index) => {
              return (
                <option value={element.category_id}>{element.category}</option>
              );
            })}
        </select>

        <select
          onChange={(e) => {
            Setsub_category(e.target.value)
            console.log(sub_category);
          }}
        >
          {subcatogre &&
            subcatogre.map((element, index) => {
              return (
                <option value={element.subCategory_id}>{element.sub_category}</option>
              );
            })}
        </select>
        <div>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <button onClick={uploadImage}>Upload</button>
        </div>
        <div>
          <img src={url} />
        </div>
      </div>
      {mesage}
    </div>
  );
};

export default Addprodact;
