import axios from "axios";
import "./style.css";
import {
  getProductAction,
  updateQuantityAction,
} from "../../redux/reducers/Admin";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const ProductTable = () => {
  const [quantityInput, setQuantityInput] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
  const [clear, setClear] = useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((result) => {
        dispatch(getProductAction(result.data.result));
        console.log(result);
      })
      .catch((err) => {});
  }, []);

  const state = useSelector((state) => {
    return {
      products: state.admin.products,
    };
  });

  const restockClick = (product_Id,e) => {
    console.log(222);
    axios
      .put("http://localhost:5000/product/admin/restock", {
        newQuntity: newQuantity,
        product_Id: product_Id,
      })
      .then((result) => {
        console.log(result);
        e.target.value=""
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <table>
        <tr>
          <th>Image</th>
          <th>Product_id</th>
          <th>picUrlProd</th>
          <th>title</th>
          <th>category</th>
          <th>sub_category</th>
          <th>product_type</th>
          <th>price</th>
          <th>description</th>
          <th>Store_Quantity</th>
          <th>note</th>
          <th>button</th>
        </tr>
        {state.products &&
          state.products.map((element, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={`${element.picUrlProd}`} className="imgTable" />
                </td>
                <td>{`${element.product_id}`} </td>
                <td>{element.picUrlProd}</td>
                <td>{element.title}</td>
                <td>{element.category}</td>
                <td>{element.sub_category}</td>
                <td>{element.product_type}</td>
                <td>{element.price}</td>
                <td>{element.description}</td>
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
                          setClear(e)
                          
                        }}
                      />
                      <button
                        onClick={() => {
                          restockClick(element.product_id,clear);
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
                  ) : (
                    <>
                      <button>Delete</button>
                      <button
                        onClick={() => {
                          setQuantityInput(true);
                        }}
                      >
                        Restocking
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
      </table>
    </>
  );
};

export default ProductTable;
