import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCart } from "../../redux/reducers/cart";

const CartPage = () => {
  const state = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
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

  return <>
  <table>
<tr>
    <th>Image</th>
    <th>Product Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Total</th>
</tr>

  {state.cart&&state.cart.map((element)=>{
      console.log(element);
      return<tr>
      <td><img src={`${element.picUrlProd}`}/></td>
      <td>{element.title}</td>
      <td><input value={element.quantity} type="number"/></td>
      <td>{element
      .price}</td>
      <td>{element.quantity*element.price}</td>
      </tr>
    })}
    





  </table>
  </>
};
export default CartPage;
