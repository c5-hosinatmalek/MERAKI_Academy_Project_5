import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { SetAllProductUsedFromUser } from "../../../redux/reducers/prduct_used";
import "./style.css";
const ALLORDERSALE = () => {
  const [messageUser, setMessageUser] = useState("");
  const dispacth = useDispatch();
  const state = useSelector((state) => {
    return {
      allordersale: state.product_used.allProductusedfromUser,
      token: state.auth.token,
    };
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/prudect_used", {
        headers: {
          authorization: `Bearer ${state.token}`,
        },
      })
      .then((resulat) => {
        dispacth(SetAllProductUsedFromUser(resulat.data.result));
      });
  }, []);

  return (
    <div className="contener_all_order_sale">
      <div className="content_all_order_sale">
        {state.allordersale &&
          state.allordersale.map((element, index) => {
            console.log(element);
            return (
              <div className="content_one_order_sale">

                {element.is_deleted?<div
                    style={{ background: ` rgba(192, 11, 11, 0.774)` }}
                    className="approvied"
                  >
                    <h1 className="fff">Admission status</h1>
                  </div>:element.admission_status ? (

                  <div
                    style={{ background: `rgba(0, 128, 0, 0.63)` }}
                    className="approvied"
                  >
                    <h1 className="fff">Admission status</h1>
                  </div>
                ) : (
                  <div

                    style={{ background: `rgba(240, 240, 16, 0.795)` }}

                    className="approvied"
                  >
                    <h1 className="fff">Admission status</h1>
                  </div>
                )}

                <div className="one_order_sale">
                  <div className="details_all_order">
                    <h1>Product Name : {element.product_name}</h1>
                    <h1>Asking price : {element.asking_price} JD</h1>
                    <h1>Phone Number :{element.phone_number} </h1>
                    <h1>Bank Account :{element.bank_account} </h1>

                    <h1>
                      Admission status :

                      {element.is_deleted?"Request Denied":element.admission_status

                        ? "it has been accepted"
                        : "Under Review"}{" "}
                    </h1>
                    <h1>Broduct Description :{element.product_description} </h1>
                  </div>

                  <div className="content_img_order">
                    <img src={element.url_imj} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ALLORDERSALE;
// admission_status
// style="background:red;"
