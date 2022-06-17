import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import axios from "axios";
import { setallProductFromAdmin } from "../../../redux/reducers/prduct_used";
import "./style.css"
const ALLPRODUCTFORADMIN=()=>{
    // const [message,setMessage]=useState("")
    // const [statemessage,setstatemessage]=useState()
    // const [className,setclassName]=useState("")
    const dispacth=useDispatch()
    const state=useSelector((state)=>{
        return{
            allOrderSaleForAdmin:state.product_used.allProductFromAdmin
        }
    })


    const allOrderSale=()=>{
        axios.get("http://localhost:5000/prudect_used/AllSaleOrderForadmin").then((resulatt)=>{

            dispacth( setallProductFromAdmin(resulatt.data.result))
            console.log(resulatt);
                
        })
    }
    // const setClasName=()=>{
    //     if(statemessage){
    //         setclassName("active")
    //     }else{
    //         setclassName("")
    //     }
    // }

    useEffect(()=>{
        allOrderSale()
    },[])





    return(
        <div className="contener_all_product_for_admin">
            {/* <div className={`message_user_use ${className}`} >
               <h1> {message}</h1>
               <button onClick={()=>{
                if(message==="Are you sure you will accept the product"){
                   

                }
               }}
               
               >OK</button>
               <button>cancle</button>
            </div> */}
                <table>
                   
                        <tr>
                            <th className="head">Image</th>
                            <th className="head">Name</th>
                            <th className="head">Category</th>
                            <th className="head">Price</th>
                            <th className="head">Bank Account</th>
                            <th className="head">admission status</th>
                            <th className="head" >Description</th>
                            <th className="head">Phone Number</th>
                            <th className="head"> Operation</th>
                        </tr>

                        {
    state.allOrderSaleForAdmin&&state.allOrderSaleForAdmin.map((element,index)=>{
        console.log(element);
        return(
            <tr>
                            <td className="body"><img className="imgTable" src={element.url_imj}/></td>
                            <td className="body"><h1>{element.product_name}</h1> </td>
                            <td className="body"> <h1>{element.category}</h1></td>
                            <td className="body"><h1>{element.asking_price}  JD</h1></td>
                            <td className="body"><h1>{element.bank_account}</h1></td>
                            <td className="body">{element.admission_status?<h1 style={{color:"green"}} >it has been accpted</h1  >:<h1 style={{color:"red"}} >under review</h1>}</td>
                            <td className="body">{element.product_description}</td>
                            <td className="body">{element.phone_number}</td>
                            <td className="body"> <button className="operButton" onClick={()=>{
                               axios.put(`http://localhost:5000/prudect_used/${element.used_product_id}`).then((result)=>{
                                allOrderSale()
                               
                                
                            })

                            }} >Accept</button>
                                <button className="operButton" onClick={()=>{axios.delete(`http://localhost:5000/prudect_used/delete/${element.used_product_id}`).then((result)=>{
                                    allOrderSale()
                                    console.log(result);
                                })}} >Delete</button>
                             </td>
            </tr>
        )
    })
}
                        
                   
                </table>
        </div>
    )
}
export default ALLPRODUCTFORADMIN


{/* <img src={element.url_imj} /> */}




{/* <table>
<tr>
  <th>Image</th>
  <th>Product_id</th>
  <th>picUrlProd</th>
  <th>title</th>
  <th>Product Name</th>
  <th>category</th>
  <th>sub_category</th>
  <th>product_type</th>
  <th>price</th>
  <th>description</th>
  <th>Store_Quantity</th>
  <th>note</th>
  <th>button</th>
</tr>
</table> */}





