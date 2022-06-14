const express=require("express")
const authentication=require("../middlewares/authentication")
const {saleOrder,requstAccept,getAllSaleOrderForUser,getAllSaleOrderForadmin,ApprovedSalesOrderforUser,ApprovedSalesOrderforAdmin,deleteProductUsed,allProductUsed,getOneProdectused,getAllProdectWithCategory}=require("../controllers/product_used")
const prudectUsedRouter=express.Router()

// post ==>http://localhost:5000/prudect_used
prudectUsedRouter.post("/",authentication,saleOrder)

//put ==>http://localhost:5000/prudect_used/:id
prudectUsedRouter.put("/:used_product_id",requstAccept)

// get ==> http://localhost:5000/prudect_used
prudectUsedRouter.get("/",authentication,getAllSaleOrderForUser)

//get ==> http://localhost:5000/prudect_used/AllSaleOrderForadmin
prudectUsedRouter.get("/AllSaleOrderForadmin",getAllSaleOrderForadmin)

// get ==> http://localhost:5000/prudect_used/Allorderapproved
prudectUsedRouter.get("/Allorderapproved",authentication,ApprovedSalesOrderforUser)


//get==> http://localhost:5000/prudect_used/Allorderapprovedforadmin
prudectUsedRouter.get("/Allorderapprovedforadmin",ApprovedSalesOrderforAdmin) 

// delete ==> http://localhost:5000/prudect_used/delete/:id
prudectUsedRouter.delete("/delete/:id",deleteProductUsed)

// get ===> http://localhost:5000/prudect_used/allproductused
prudectUsedRouter.get("/allproductused",allProductUsed)

//get ===> http://localhost:5000/prudect_used/productdetails/:id
prudectUsedRouter.get("/productdetails/:id",getOneProdectused)

// get ===> http://localhost:5000/prudect_used/productbycategory/:category
prudectUsedRouter.get("/productbycategory/:category",getAllProdectWithCategory) 
module.exports=prudectUsedRouter