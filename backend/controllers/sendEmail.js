const res = require("express/lib/response")
const nodemailer =require("nodemailer")
const connection =require("../models/db")
const sendEmail=(req,res)=>{
    console.log("send");
    const {emailBody}=req.body
    const {subject}=req.body
    const {product_Id}=req.body
    const {email}=req.body
    console.log(subject,email,emailBody);
const transporter= nodemailer.createTransport({
    service:"Gmail",
    auth :{
        type:"oauth2",
        user:process.env.USER2,
        pass:process.env.PASS,
        clientId:process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        refreshToken:process.env.REFRESHTOKEN
    }
})
if(subject.includes("restock")){



    const query = "SELECT email FROM request INNER JOIN PRODUCTS ON REQUEST.product_id=PRODUCTS.product_id WHERE request.IS_DELETED =0 AND PRODUCTS.PRODUCT_ID=? AND request.is_emailsend=0; "
  const data=[product_Id]
  connection.query(query,data,(err,result)=>{
    if(err){
      console.log(err);
      return
    }
    result.forEach((element)=>{
        const mailOptions ={
            from:"datapirates1996@gmail.com",
            to:`${element.email}`,
            subject:`${subject}`,
            text:`${emailBody}`
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
               return res.json({error})
            }
            const query ="UPDATE REQUEST SET IS_EMAILSEND =1 WHERE EMAIL=? "
            const data =[element.email]
            connection.query(query,data,(err,result)=>{
                if(err){
                    console.log(err);
                    return
                  }
                  console.log(result);
            })
            res.json({succses:true,info})
        })

    })
    
    
    
})





}
if (subject.includes("verfied")) {
    console.log("in verfied");
    const mailOptions ={
        from:"datapirates1996@gmail.com",
        to:`${email}`,
        subject:`${subject}`,
        text:`${emailBody}`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
           return res.json({error})
        }
        
        res.json({info});
    })
}


}
module.exports={sendEmail}
