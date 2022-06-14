import React from "react";
import { Link } from "react-router-dom";
import "./style.css"
const ADMINCONTROL=()=>{
    return(
        <div className="contenur_admin_control">
            <div className="all_link_page">
                <Link to={"/admin/usersTable"} >uesrs</Link>
                <Link to={"/admin/productTable"} >product</Link>
                <Link to={"/creat"}>category</Link>
                <Link to={"/admin/uplodphoto"} >home page</Link>
                <Link to={"/all_order_sale_for_admin"} >product used</Link>
                
            </div>
        </div>
    )
}
export default ADMINCONTROL