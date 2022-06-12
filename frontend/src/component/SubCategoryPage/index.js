import axios from "axios";
import React,{useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getProductbySubCategoryId } from "../../redux/reducers/search";
import "./style.css"

const SubCatgoryPage =()=>{

const {subCategory_id}=useParams()

const dispatch=useDispatch()

const state =useSelector((state)=>{

return {
    subCatgoryProduct: state.search.subCatgoryProduct
}
})

useEffect(()=>{
  dispatch(getProductbySubCategoryId(subCategory_id))


},[])

return <>


{state.subCatgoryProduct&&state.subCatgoryProduct.map((element,index)=>{
    return <div className="productdivSub">
    <Link
      to={`/category/product/${element.product_id}`}
      key={index}
      className="linkProduct"
    >
      <img className="productImg" src={element.picUrlProd}></img>
      <p className="titlePar"> {element.title}</p>
      <p className="descriptionPar">
        {" "}
        {element.description.split(" ").slice(1, 15).join(" ")}...
      </p>

      <p className="pricePar"> {element.price} JD</p>
    </Link>
  </div>
})}

</>


}

export {SubCatgoryPage}
