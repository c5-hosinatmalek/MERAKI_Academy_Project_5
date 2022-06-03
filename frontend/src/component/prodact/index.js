import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../redux/reducers/prodact";
import axios from "axios";

const GetProdact = () => {
  const dispacth = useDispatch();
  const { id } = useParams();

  const state = useSelector((state) => {
      console.log(state);
    return {
      prodect: state.product.product
    };
  });

  console.log(true);

  const test = async () => {
    await axios
      .get(`http://localhost:5000/category/${id}/products`)
      .then((resulat) => {
        dispacth(getproduct(resulat.data));
        console.log(state.prodect.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    test();
  }, [id]);

  return (
    <div>
      {state.prodect.result &&
        state.prodect.result.map((element, index) => {
          return (
            <div>
              <img src={element.picUrl}></img>
              <p>{element.title}</p>
              <p>{element.description}</p>
              <p>{element.product_type}</p>
              <p>{element.price}</p>
            </div>
          );
        })}
    </div>
  );
};
export default GetProdact;
