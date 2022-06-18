import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

const SoldTable = () => {
  const [soldTable, setSoldTable] = useState([]);
  useEffect(() => {
    console.log(111111);
    axios
      .get("http://localhost:5000/product/admin/soldtable")
      .then((result) => {
        setSoldTable(result.data.result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="soldTable">
      <table>
        <tr>
          <th className="head">Tilte</th>
          <th className="head">Buy price</th>
          <th className="head">Sold price</th>
          <th className="head">Quantity</th>
          <th className="head">Date</th>
          <th className="head">Profit</th>
        </tr>

        {soldTable&&soldTable.map((element) => {
            console.log(element.price_buy);
          return (
            <tr>
              <td className="body">{element.title}</td>
              <td className="body">{element.price_buy}</td>
              <td className="body">{element.sold_price}</td>
              <td className="body">{element.quantity}</td>
              <td className="body">{element.date}</td>
              <td className="body">
                {(element.sold_price - element.price_buy) * element.quantity}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export  {SoldTable};
