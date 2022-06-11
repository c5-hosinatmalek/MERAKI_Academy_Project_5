import React, { useState, useEffect } from "react";
import axios from "axios";
const Getallcarts = () => {
  const data = [];
const category=[]
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((result) => {
        data.push(result.data.result);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/sub_category")
      .then((result) => {
        category.push(result.data.result)
        console.log(category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      {data &&
        data.map((element, index) => {
          console.log(element);
        })}
    </div>
  );
};

export default Getallcarts;
