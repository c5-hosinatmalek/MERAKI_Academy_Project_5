import axios from "axios";
import "./style.css";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToUsed, deleteusedpro } from "../../redux/reducers/cart";
import { MdDelete } from "react-icons/md";
import {
  getCart,
  updateQuantity,
  deleteFromCart,
  checkoutAction,
  deleteallused,
  price,
} from "../../redux/reducers/cart";
import Pay from "../paypal/index";
import { useNavigate  } from "react-router-dom";
const CartPage = () => {
  const [show, setshow] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

const navigate=useNavigate()

  const [clascontent,setclascontent]=useState("")
  const [lengthCart,setLengthCart]=useState()
  


  const state = useSelector((state) => {
    return {
      cart: state.cart.cart,
      usedcart: state.cart.usedcart,
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
    };
  });
  const dispatch = useDispatch();
  const gelAllCart=()=>{
    axios
      .get("http://localhost:5000/cart/getcart/", {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setLengthCart(result.data.result.length)
        dispatch(getCart(result.data.result));
        if(result.data.result.length===0){
          setclascontent("active")
        }else{
          setclascontent("")
        }

        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    
    gelAllCart()
    axios
      .post(
        "http://localhost:5000/cart/cart/usedprodact",
        {},
        {
          headers: {
            authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.result);
        dispatch(addToUsed(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  },[lengthCart]);

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
      .then((result) => {
        console.log(result);
      })
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

//         }}).then((result)=>{
            
//         }).catch((err)=>{
//             console.log(err);
//         })
// }


// const CheckOutClick=()=>{
//   let date = new Date()
//   date = date.toString().split(" ").slice(1,4).join(" ")
 
//   axios.put("http://localhost:5000/cart/checkout",{arrayCheckout:state.cart,date},{
//     headers: {
//       authorization: `Bearer ${state.token}`,
//     }}).then((result)=>{
// setMessage("Your order has been accepted")
//       dispatch(checkoutAction())
//     }).catch((err)=>{
//       console.log(err);
//     })
// }
// let amount =0

//   return <div className="contenur_cart" >
//     <h1 className={`message_cart ${clascontent}`} >Cart is empty</h1>
//       <div className={`content_cart ${clascontent}`} >
//   <table>
// <tr className="headerCartTable">
//     <th>Image</th>
//     <th>Product Name</th>
//     <th>Quantity</th>
//     <th>Price</th>
//     <th>Total</th>
// </tr>

        },
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteused = (id) => {
    dispatch(deleteusedpro(id));
    console.log(id);
    axios
      .delete(`http://localhost:5000/cart/cart/delete/${id}`, {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
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
  let usedamount = 0;
  return (
    <div className="contenur_cart">
      <h1 className={`message_cart ${clascontent}`} >Cart is empty</h1>
      <div className={!lengthCart?`content_cart active`:`content_cart`}>
      <table>
        <tr className="headerCartTable">
          <th>Image</th>
          <th className="non">Product Name</th>
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
                      gelAllCart()
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
        {state.usedcart &&
          state.usedcart.map((element, index) => {
            console.log(element);
            return (
              <tr key={index}>
                <td>
                  <img src={`${element.url_imj}`} className="imgCart" />
                </td>
                <td className="titleCell">{element.product_description}</td>
                <td className="quantityCell">
                  <button
                    className="deleteIcon"
                    onClick={() => {
                      console.log(false);
                     
                      
                      deleteused(element.used_product_id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td className="priceCell">{element.price_checkout} JD</td>
                <td className="totalCell">
                  {(usedamount = usedamount + element.price_checkout)} JD
                </td>
              </tr>
            );
          })}
        <tr className="totalPriceRow">
          <td></td>
          <td></td>
          <td></td>
          <td className="tdtotalprice">Total Price</td>
          <td className="tdtotalprice">{amount + usedamount} JD</td>
        </tr>
      </table>
      <h1>{message}</h1>
      {show ? (
        <div>
          <Pay />
        </div>


      ) : (
        <button
          className="checkotbtton"
          onClick={() => {
            setshow(true);
            dispatch(price(amount + usedamount));
          }}
        >
          Check Out
        </button>
      )}
      ;{message}



    </div>
    </div>
  );
};

export default CartPage;
