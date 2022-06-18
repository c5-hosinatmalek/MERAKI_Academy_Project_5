import React from "react";
import { Link } from "react-router-dom";
import "./style.css"
const ADMINCONTROL=()=>{
    return(
        <div className="contenur_admin_control">
            <div className="all_link_page">
                <Link to={"/admin/usersTable"} >Users Table</Link>
                <Link to={"/admin/productTable"} >Products Table</Link>
                <Link to={"/creat"}>Add new product</Link>
                <Link to={"/admin/uplodphoto"} >Home page</Link>
                <Link to={"/all_order_sale_for_admin"} >Used product</Link>
                <Link to={"admin/soldTable"}>Sold Table</Link>
                
            </div>
        </div>
    )
}
export default ADMINCONTROL