import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getcatogre } from "../../redux/reducers/catogre";
import "./style.css";

const CategoryBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      category: state.catogre.catorge,
    };
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((result) => {
        dispatch(getcatogre(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="categoryBar">
      {state.category &&
        state.category.map((element, index) => {
          return (
            <Link to={`/category/${element.category_id}/products`} key={index}>
              {element.category}
            </Link>
          );
        })}
        <Link to="/all_product_used" >Used Products</Link>
    </div>
  );
};

export { CategoryBar };
