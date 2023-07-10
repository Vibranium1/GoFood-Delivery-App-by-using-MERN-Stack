const express = require('express');
const router = express.Router();
const Order= require('../models/Orders');

router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let email = req.body.email;
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            // console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                // push used to append 
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router











// const express = require("express");
// const router = express.Router();
// const Order= require('../models/Orders');

// router.post('/orderData', async (req,res)=>{
//     let data = req.body.order_data
//     await data.splice(0,0,{Order_data:req.body.order_data})
//     console.log("1231242343242354",req.body.email)
     
//     //if email not in db then create: else: InsertMany()
//     let eId = await Order.findOne({'email':req.body.email})
//     console.log(eId)
//  if(eId===null){
//     try{
//         console.log("hello")
//         await Order.create({
//             email:req.body.email,
//             order_data: [data]
//         }).then(()=>{
//             console.log("world")
//            return res.json({success:true})

//         })
//     } catch(error){
//         // console.log(error.message)
//         return res.send("Server Error").send(error.message)
//     }
//  }
  
//  else{
//     try{
//         await Order.findOneAndUpdate({email: req.body.email},
//             {$push:{order_data:data}}).then(()=>{
//              return res.json({success:true})   
//             })
//         } catch(error){
//            return res.send("Server Error", error.message)
//         }
//     }
//  }
// )
// module.exports=router;