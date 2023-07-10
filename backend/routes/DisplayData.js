const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try{
        
    res.send([global.rdFood_items,global.rdFoodCats])
    }
    catch(err) {
     console.log(err.message);
     res.send("Sever Error")
    }
})


module.exports=router;