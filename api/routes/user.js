const router = require("express").Router();
const User = require("../model/User")
const bcrypt = require("bcrypt")



// upadte user

router.put("/:id", async(req,res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
        }
    }
})



module.exports = router