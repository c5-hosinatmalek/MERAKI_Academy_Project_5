import axios from "axios";
import "./style.css"
import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCart,updateQuantity,deleteFromCart } from "../../redux/reducers/cart";

const CartPage = () => {
    const [quan, setquan] = useState(0)
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
        dispatch(getCart(result.data.result));
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const updateQuantityFun=(index,quantity,product_id)=>{
      
      dispatch(updateQuantity([index,quantity]))
      axios.put("http://localhost:5000/cart/quantity",{product_id,quantity},{
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      }).then((result)=>{
         
      }).catch((err)=>{
          console.log(err);
      })
  }
const deleteCartClick=(product_id)=>{
    
    dispatch(deleteFromCart(product_id))
    axios.delete(`http://localhost:5000/cart/${product_id}`,{
        headers: {
          authorization: `Bearer ${state.token}`,
        }}).then((result)=>{
            
        }).catch((err)=>{
            console.log(err);
        })
}

const CheckOutClick=()=>{
 
  axios.put("http://localhost:5000/cart/checkout",{arrayCheckout:state.cart},{
    headers: {
      authorization: `Bearer ${state.token}`,
    }}).then((result)=>{
      
    }).catch((err)=>{
      console.log(err);
    })
}
  return <>
  <table>
<tr>
    <th>Image</th>
    <th>Product Name</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Total</th>
</tr>

  {state.cart&&state.cart.map((element,index)=>{
      return<tr key={index}>
      <td><img src={`${element.picUrlProd}`} className="imgCart"/></td>
      <td>{element.title}</td>
      <td><input defaultValue={element.quantity} onChange={(e)=>{
updateQuantityFun(index,e.target.value,element.product_id)
      }} type="number" min={0} max={element.Store_Quantity}/><button onClick={()=>{
        deleteCartClick(element.product_id)
      }}>delete</button></td>
      <td>{element
      .price}</td>
      <td>{element.quantity*element.price}</td>
      </tr>
    })}
    

  </table>
  <button onClick={(e)=>{
CheckOutClick()
  }}>Check Out</button>
  </>
};
export default CartPage;
