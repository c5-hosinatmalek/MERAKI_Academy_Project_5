const res = require("express/lib/response")
const nodemailer =require("nodemailer")

const sendEmail=(req,res)=>{
    const {userEmail}=req.body
    
    const {emailBody}=req.body
    
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
const mailOptions ={
    from:"datapirates1996@gmail.com",
    to:`${userEmail}`,
    subject:"dont replay on this email",
    text:`${emailBody}`
}
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
       return res.json({error})
    }
    res.json({succses:true,info})
})


}
module.exports={sendEmail}
