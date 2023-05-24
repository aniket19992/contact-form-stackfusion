const express =  require("express")
const router= express.Router()
const User= require("../models/user")
const nodemailer= require("nodemailer")

router.post("/user-form", async(req,res)=>{
    try {
        let {name, dob, email, phone}= req.body
        let user= await User.findOne({email})
        if(user){
            console.log(user)
            return res.json({error : "Users already exists"})
        }
        if(!(/^\d{10}$/.test(phone))) {
            return res.json({error : "Invalid Phone Number"})
        }    
        user= await User.create(req.body)
        // console.log(user)
        res.json({
            user,
            message:"Form Submitted"
        })

    } catch (error) {
        res.json({
            error: error.message
        })
    }
})

router.post("/sendMail", async(req,res)=>{
    const {name,email,dob,phone}=req.body
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.USERNAME ,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions = {
            from :process.env.USERNAME,
            to: email,
            subject:"Fusion Stack user-form Submitted Successfully",
            html:`<h1>Your details are as follow</h1>
                  <p>Name : ${name} </p>
                  <p>DOB  : ${dob.split("T")[0]}</p>
                  <p>phone : ${phone}</p>
                `
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Email sent")
                res.status(201).json({
                    status:201,
                    info
                })
            }
        })

    } catch (error) {
        res.status(401).json({
            status:401,
            error
        })
    }
})

router.get("/allUsers",async(req,res)=>{
    try {
        let users= await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }   
})
module.exports= router