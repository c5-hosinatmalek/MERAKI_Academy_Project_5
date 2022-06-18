import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import {
  checkoutAction,
  deleteallused,
} from "../../redux/reducers/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const currency = "USD";
const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner }) => {
  const disp=useDispatch()
  const Navigate=useNavigate()
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const state = useSelector((state) => {
    return {
      cart: state.cart.cart,
      usedcart: state.cart.usedcart,
      token: state.auth.token,
      totalPrice: state.cart.totalPrice,
      amount:state.cart.amount
    };
  });

  const amount = state.amount;
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
        disp(checkoutAction());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, []);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            console.log(false);
            CheckOutClick()
            disp(deleteallused())
            Navigate("/")
          });
        }}
      />
    </>
  );
};

export default function Pay() {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "AdY0PQExOyB9Li3LXT0AU7fGPk6poN63HUURmfRMWeZbDElqqVGoCNWZcKK9vTEuY7txRkV8nXovDJox",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
