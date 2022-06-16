import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdDelete } from "react-icons/md";

import {
  getCart,
  updateQuantity,
  deleteFromCart,
  checkoutAction,
} from "../../redux/reducers/cart";

const CartPage = () => {
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const state = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/getcart/", {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(getCart(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateQuantityFun = (index, quantity, product_id) => {
    dispatch(updateQuantity([index, quantity]));
    axios
      .put(
        "http://localhost:5000/cart/quantity",
        { product_id, quantity },
        {
          headers: {
            authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  //  dispatch(totalPriceAction(element.quantity*element.price))

  const deleteCartClick = (product_id) => {
    dispatch(deleteFromCart(product_id));
    axios
      .delete(`http://localhost:5000/cart/${product_id}`, {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const CheckOutClick = () => {
    let date = new Date();
    date = date.toString().split(" ").slice(1, 4).join(" ");

    axios
      .put(
        "http://localhost:5000/cart/checkout",
        { arrayCheckout: state.cart, date },
        {
          headers: {
            authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        setMessage("Your order has been accepted");
        dispatch(checkoutAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let amount = 0;

  return (
    <>
      <table>
        <tr className="headerCartTable">
          <th>Image</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>

        {state.cart &&
          state.cart.map((element, index) => {
            amount += element.quantity * element.price;

            return (
              <tr key={index}>
                <td>
                  <img src={`${element.picUrlProd}`} className="imgCart" />
                </td>
                <td className="titleCell">{element.title}</td>
                <td className="quantityCell">
                  <input
                    defaultValue={element.quantity}
                    onChange={(e) => {
                      updateQuantityFun(
                        index,
                        e.target.value,
                        element.product_id
                      );
                    }}
                    type="number"
                    min={0}
                    max={element.Store_Quantity}
                    className="inputQuantity"
                  />
                  <button
                    className="deleteIcon"
                    onClick={() => {
                      deleteCartClick(element.product_id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td className="priceCell">{element.price} JD</td>
                <td className="totalCell">
                  {element.quantity * element.price} JD
                </td>
              </tr>
            );
          })}
        <tr className="totalPriceRow">
          <td></td>
          <td></td>
          <td></td>
          <td className="tdtotalprice">Total Price</td>
          <td className="tdtotalprice">{amount} JD</td>
        </tr>
      </table>
      <h1>{message}</h1>
      <button
        className="checkotbtton"
        onClick={(e) => {
          CheckOutClick();
        }}
      >
        Check Out
      </button>
    </>
  );
};

export default CartPage;
