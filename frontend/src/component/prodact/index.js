import React, { useEffect,useState } from "react";

import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getproduct,getProductbySubCategoryId } from "../../redux/reducers/prodact";
import { getSubCategory } from "../../redux/reducers/catogre";

import axios from "axios";

import "./style.css";

const GetProdact = () => {
  const dispacth = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      prodect: state.product.product,
      sub_category:state.catogre.subCategory,
      subCatgoryProduct:state.product.subCatgoryProduct
    };
  });
  const [show, setShow] = useState(state.prodect)


  const products = async () => {
    await axios
      .get(`http://localhost:5000/category/${id}/products`)
      .then((result) => {
        
        dispacth(getproduct(result.data.result));
        setShow(result.data.result)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sub_category= () =>{
    axios.get(`http://localhost:5000/sub_category/${id}`).then((result)=>{
      
dispacth(getSubCategory(result.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    products();
    sub_category()
  }, [id]);

  const sub_categoryClick = (index)=>{
    
    

    
      dispacth(getProductbySubCategoryId(state.sub_category[index].subCategory_id))
      setShow(state.subCatgoryProduct)

    
  }

  return (
    <div className="container_page" >
      <div className="subCategory">
        {state.sub_category&&state.sub_category.map((element,index)=>{
          return <p key={index} onClick={()=>{
            sub_categoryClick(index)
          }}>{element.sub_category}</p>
        })}
      </div>
      <div className="side_bar" >
        <div className="orderby_price">
            <h3>Sorte By price</h3>
            <select   onChange={(e)=>{
                       
                      if(e.target.value==="the least"){ axios.get(`http://localhost:5000/product/ascending/all/${id}`).then((result)=>{
                      
                        dispacth(getproduct(result.data.result));
                      
                      })}else{
                        axios.get(`http://localhost:5000/product/descending/all/${id}`).then((result)=>{
                          
                        dispacth(getproduct(result.data.result));
                       
                      })
                      }
                 
                }}>
              <option value={"the least"}>
                the least
              </option>
              <option value={"the above"}>
              the above
              </option>
            </select>
        </div>
        <div className="orderby_letter">
            <h3>Sorte By Alphabet</h3>
            <select onClick={(e)=>{
              ;
               if(e.target.value==="A-TO-Z"){axios.get(`http://localhost:5000/product/ByLetters/all/${id}`).then((result)=>{
                      
                dispacth(getproduct(result.data.result));
              
              })}
            }} >
              <option value={"A-TO-Z"}>A-TO-Z</option>
            </select>
        </div>
      </div>
       <div className="All_Product">
      {show &&
        show.map((element, index) => {
          
          return (
            <div className="productDiv">
              <Link to={`/category/product/${element.product_id}`} key={index} className="linkProduct">
                <p className="titlePar">  {element.title}</p>
                <img className="productImg" src={element.picUrlProd}></img>
                <p className="descriptionPar">
                  {" "}
                   {element.description.split(" ").slice(1, 15).join(" ")}...
                </p>
               
                <p className="pricePar">  {element.price} JD</p>
              </Link>
            </div>
          );
        })}
    </div>
    </div>
   
  );
};

export default GetProdact;
