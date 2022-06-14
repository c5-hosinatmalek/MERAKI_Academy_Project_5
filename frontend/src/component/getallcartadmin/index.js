import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
const Getallcarts = () => {
  const [data, setData] = useState("");
  const [category, setCategory] = useState("");
  let sorteddata;
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((result) => {
        setData(result.data.result);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/sub_category")
      .then((result) => {
        setCategory(result.data.result);
        console.log(category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortdata = (string) => {
    const sorteddata = data.map((element) => {
      if (element.sub_category === string) {
        return (
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
            </tr>

            <tr>
              <td>
                <img className="adminimg" src={element.picUrlProd} />
              </td>
              <td>{element.title}</td>
              <td> {element.price} </td>
            </tr>
          </table>
        );
      }
    });
    return sorteddata;
  };
  sorteddata =
    category &&
    category.map((element, index) => {
      return (
        <div>
          <h1>{element.sub_category}</h1>

          {sortdata(element.sub_category)}
        </div>
      );
    });

  return <div>{sorteddata}</div>;
};

export default Getallcarts;
