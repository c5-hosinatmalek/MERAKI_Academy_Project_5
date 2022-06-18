import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { SetAllProductUsedFromUser } from "../../../redux/reducers/prduct_used";
import "./style.css";
const ALLORDERSALE = () => {
  const [messageUser, setMessageUser] = useState("");
  const [clasName, setClasName] = useState("");
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

        if (resulat.data.result.length === 0) {
          setMessageUser("No Sales Orders");
          setClasName("active");
        } else {
          setMessageUser("");
          setClasName("");
        }
      });
  }, []);

  return (
    <div className="contener_all_order_sale">
      <div className="content_alll">
      <h1 className={`mesageif_empty ${clasName}`}>{messageUser}</h1>
      <div className="content_all_order_sale">
        {state.allordersale &&
          state.allordersale.map((element, index) => {
            return (
              <div className="content_one_order_sale">
                {element.is_deleted ? (
                  <div
                    style={{ background: ` rgba(192, 11, 11, 0.774)` }}
                    className="approvied"
                  >
                    <h1 className="fff">Used Product</h1>
                  </div>
                ) : element.admission_status ? (
                  <div
                    style={{ background: `rgba(0, 128, 0, 0.63)` }}
                    className="approvied"
                  >
                    <h1 className="fff">Used Product</h1>
                  </div>
                ) : (
                  <div
                    style={{ background: `rgba(240, 240, 16, 0.795)` }}
                    className="approvied"
                  >
                    <h1 className="fff">Used Product</h1>
                  </div>
                )}

                <div className="one_order_sale">
                  <div className="details_all_order">
                    <h2>
                      Product Name :
                      <span className="proInfo"> {element.product_name}</span>{" "}
                    </h2>
                    <h2>
                      Asking Price :
                      <span className="proInfo">
                        {" "}
                        {element.asking_price} JD{" "}
                      </span>{" "}
                    </h2>
                    <h2>
                      Phone Number :
                      <span className="proInfo"> {element.phone_number}</span>{" "}
                    </h2>
                    <h2>
                      Bank Account :
                      <span className="proInfo">{element.bank_account}</span>{" "}
                    </h2>

                    <h2>
                      Approved Status :
                      <span className="proInfo">
                        {element.is_deleted
                          ? "Request Denied"
                          : element.admission_status
                          ? "it has been accepted"
                          : "Under Review"}{" "}
                      </span>
                    </h2>
                    <h2>
                      Description :
                      <span className="proInfo">
                        {element.product_description}
                      </span>
                    </h2>
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
    </div>
  );
};
export default ALLORDERSALE;
// admission_status
// style="background:red;"
