import axios from "axios";
import "./style.css";
import {
  getProductAction,
  updateQuantityAction,
  deleteProductAction,
  updateProudctsAction,
} from "../../redux/reducers/Admin";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const ProductTable = () => {
  const [quantityInput, setQuantityInput] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [clear, setClear] = useState("");
  const [indexState, setIndexState] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sub_category, Setsub_category] = useState(1);
  const [cato, setCato] = useState(1);
  const [product_name, Setproduct_name] = useState("");
  const [product_type, Setproduct_type] = useState(1);
  const [description, Setdescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, Setprice] = useState(0);
  const [title, Settitle] = useState("");
  const [image, setImage] = useState("");

  const subcatogry = () => {
    axios
      .get("http://localhost:5000/sub_category")
      .then((result) => {
        setSubcategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallcarogre = () => {
    axios
      .get("http://localhost:5000/category")
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // -------

  useEffect(() => {
    subcatogry();
    getallcarogre();

    axios
      .get("http://localhost:5000/product")
      .then((result) => {
        dispatch(getProductAction(result.data.result));
      })
      .catch((err) => {});
  }, []);

  const state = useSelector((state) => {
    return {
      products: state.admin.products,
    };
  });
  // function to restock quentity
  const restockClick = (product_Id, e, title) => {
    axios
      .put("http://localhost:5000/product/admin/restock", {
        newQuntity: newQuantity,
        product_Id: product_Id,
      })
      .then((result) => {
        e.target.value = "";
        if (newQuantity !== 0) {
          axios.post("http://localhost:5000/email", {
            subject: `${title} has been restocked`,
            emailBody: `The item :${title} has been restock   vist http://localhost:3000/category/product/${product_Id} so you can place your order`,
            product_Id,
          }).then((result)=>{
            console.log({result});
          }).catch((err)=>{
            console.log({err});
          });
        }
      })
      .catch((err) => {});
  };
  // function to dlete producte
  const deleteClick = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`)
      .then((result) => {
        dispatch(deleteProductAction(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // function to update date of producte
  const updateClick = (id, index) => {
    axios
      .put(`http://localhost:5000/product/${id}`, {
        picUrlProd: url,
        title,
        category_id: cato,
        sub_category: sub_category,
        product_name,
        product_type,
        price,
        description,
      })
      .then((result) => {
        dispatch(
          updateProudctsAction([
            index,
            {
              picUrlProd: url,
              title,
              category_id: cato,
              sub_category: sub_category,
              product_name,
              product_type,
              price,
              description,
            },
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setIndexState("");
  };
  // function to upload image to cloudenry
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Project4");
    data.append("cloud_name", "halhouli");
    fetch("  https://api.cloudinary.com/v1_1/halhouli/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contenur_product_taple" >
      <table>
        <tr>
          <th className="head">Image</th>
          <th className="head">Product id</th>
          <th className="head">PicUrlProd</th>
          <th className="head">Title</th>
          <th className="head">Product Name</th>
          <th className="head">Category</th>
          <th className="head">Sub Category</th>
          <th className="head">Product_Type</th>
          <th className="head">Buy Price</th>
          <th className="head">Sell Price</th>
          <th className="head">Description</th>
          <th className="head">Store Quantity</th>
          <th className="head">Note</th>
          <th className="head">button</th>
        </tr>
        {state.products &&
          state.products.map((element, index) => {
            return (
              <tr key={index}>
                <td className="body">
                  <img src={`${element.picUrlProd}`} className="imgTable" />
                </td>

                <td className="body">{`${element.product_id}`} </td>
                {index !== indexState ? (
                  <>
                    <td className="body">{element.picUrlProd}</td>
                    <td className="body">{element.title}</td>
                    <td className="body">{element.product_name}</td>
                    <td className="body">{element.category}</td>
                    <td className="body">{element.sub_category}</td>
                    <td className="body">{element.product_type}</td>
                    <td className="body">{element.buy_price}</td>
                    <td className="body">{element.price}</td>
                    <td className="body" id="description">{element.description}</td>
                  </>
                ) : (
                  <>
                    <td>
                      <input
                        type="file"
                        className="inputImg"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <button className="buttonImg" onClick={uploadImage}>
                        Upload
                      </button>
                    </td>
                    <td>
                      <input
                        placeholder="Title"
                        defaultValue={element.title}
                        onChange={(e) => {
                          Settitle(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        placeholder="Product Name"
                        defaultValue={element.title}
                        onChange={(e) => {
                          Setproduct_name(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <select
                        onChange={(e) => {
                          setCato(e.target.value);
                        }}
                      >
                        {category &&
                          category.map((element) => {
                            return (
                              <option value={element.category_id}>
                                {element.category}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                    <td>
                      <select
                        onChange={(e) => {
                          Setsub_category(e.target.value);
                        }}
                      >
                        {subcategory &&
                          subcategory.map((element) => {
                            return (
                              <option value={element.subCategory_id}>
                                {element.sub_category}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                    <td>
                      <input
                        placeholder="Product_type"
                        defaultValue={element.product_type}
                        onChange={(e) => {
                          Setproduct_type(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Price"
                        defaultValue={element.price}
                        onChange={(e) => {
                          Setprice(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <textarea
                        onChange={(e) => {
                          Setdescription(e.target.value);
                        }}
                        placeholder="Description"
                        type="text"
                        cols="25"
                        rows="4"
                      >
                        {element.description}
                      </textarea>
                    </td>
                  </>
                )}
                <td>{element.Store_Quantity}</td>
                <td>
                  {element.Store_Quantity < 10
                    ? "Restock the product"
                    : "The stock is good"}
                </td>
                <td>
                  {quantityInput ? (
                    <>
                      <input
                        type={"number"}
                        placeholder="New Quantity"
                        onChange={(e) => {
                          setNewQuantity(e.target.value);
                          setClear(e);
                        }}
                      />
                      <button
                        onClick={() => {
                          restockClick(
                            element.product_id,
                            clear,
                            element.title
                          );
                          dispatch(updateQuantityAction([index, newQuantity]));
                        }}
                      >
                        Add New Qunantity
                      </button>
                      <button
                        onClick={() => {
                          setQuantityInput(false);
                        }}
                      >
                        Close Stocking
                      </button>
                    </>
                  ) : index !== indexState ? (
                    <>
                      <button
                        onClick={() => {
                          deleteClick(element.product_id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setIndexState(index);
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setQuantityInput(true);
                        }}
                      >
                        Restocking
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          updateClick(element.product_id);
                        }}
                      >
                        Update
                      </button>{" "}
                      <button
                        onClick={() => {
                          setIndexState("");
                        }}
                      >
                        cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default ProductTable;
