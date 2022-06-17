import React, { useState, useEffect } from "react";
import "./style.css"

import axios from "axios";
const Addprodact = () => {
  const [mesage, setMesage] = useState("");
  const [catogre, setCatogre] = useState("");
  const [subcatogre, setSubcatogre] = useState("");
  const [sub_category, Setsub_category] = useState(1);
  const [cato, setCato] = useState(0);
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
      .then((result) => {
        setSubcatogre(result.data.result);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallcarogre();
    subcatogry();
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

        axios
          .post("http://localhost:5000/product/create", {
            picUrlProd: data.url,
            title,
            category_id: cato,
            sub_category: sub_category,
            product_name,
            product_type,
            price,
            description,
            Store_Quantity,
          })
          .then((resulat) => {
            setMesage("iteam has been add");
          })
          .catch((err) => {
            setMesage("error ");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="createProduct">
      <div className="addNewsChild">
        <h1 id="title">Add new product</h1>
        <div className="divLabel">
          <label for="titleNew" type="text" className="labelNew">
            Title
          </label>
          <textarea
            id="titleNew"
            className="newsinput"
            placeholder="Title"
            onChange={(e) => {
              Settitle(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="divLabel">
          <label for="descrNew" type="text" className="labelNew">
          Description
          </label>
          <textarea id="descrNew"
            className="newsinput"
            placeholder="Description"
            onChange={(e) => {
              Setdescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="divLabel">
          <label for="quantity" type="text" className="labelNew">
         Quantity
          </label>
          <input 
          className="inputCreate"
            placeholder="Quantity"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="5"
            onChange={(e) => {
              SetStore_Quantity(e.target.value);
            }}
          ></input>
        </div>
        <div className="divLabel">
          <label for="name" type="text" className="labelNew">
            Product Name
          </label>
          <input
          className="inputCreate"
            placeholder="Name"
            onChange={(e) => {
              Setproduct_name(e.target.value);
            }}
          ></input>
        </div>
        <div className="divLabel">
          <label for="typeNew" type="text" className="labelNew">
            Product Type
          </label>
          <input
          className="inputCreate"
          id="typeNew"
            placeholder="Type"
            onChange={(e) => {
              Setproduct_type(e.target.value);
            }}
          ></input>
        </div>
        <div className="divLabel">
          <label for="price" type="text" className="labelNew">
          Price
          </label>
          <input
          className="inputCreate"
          id="price"
            placeholder="Price"
            onChange={(e) => {
              Setprice(e.target.value);
            }}
          ></input>
        </div>
        <div className="divLabel">
          <label for="titleNew" type="text" className="labelNew">
          Category
          </label>
          <select
          className="inputCreate"
          id="category"
            onChange={(e) => {
              setCato(e.target.value);
            }}
          >
            <option></option>
            {catogre &&
              catogre.map((element, index) => {
                return (
                  <option value={element.category_id}>
                    {element.category}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="divLabel">
          <label for="subcategory" type="text" className="labelNew">
          Sub Category
          </label>
          <select
          className="inputCreate"
          id="subcategory"
            onChange={(e) => {
              Setsub_category(e.target.value);
            }}
          >
            <option></option>
            {subcatogre &&
              subcatogre.map((element, index) => {
                return (
                  <option value={element.subCategory_id}>
                    {element.sub_category}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="divLabel">
          <label for="uploadImg" type="text" className="labelNew">
            Image
          </label>
          <input
          className="inputCreate"
          id="uploadImg"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <button className="uploadCreat" onClick={uploadImage}>Upload</button>
        </div>
        <div className="divLabel">
          <img src={url} />
        </div>
      </div>
      {mesage}
    </div>
  );
};

export default Addprodact;
