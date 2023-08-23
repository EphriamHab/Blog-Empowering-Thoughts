const router = require("express").Router();
const User = require("../model/User")
const Post = require("../model/Post")
const bcrypt = require("bcrypt")



// upadte user

router.put("/:id", async(req,res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            const upadteUser = await User.findByIdAndUpdate(
               req.params.id,
               {
                $set:req.body,
               },
               {
                new:true,
               }
            )
            res.status(200).json(upadteUser)
        }catch(error){
            res.status(500).json(error)
        }
    }else{
      res.status(401).json("You can update your account")
    }
})


router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){

        try{
            const user = await User.findById(req.params.id)
             try{
               await post.deleteMany({username:user.username})

               await User.findByIdAndDelete(req.params.id)
               res.status(200).json("user has been deleted")
             }catch(error){
               res.status(500).json(error)
             }
        }
        catch(error){
            res.status(404).json("user not found")
        }
    }else{
        res.status(401).json("you can delete only your account...")
    }
})

router.get("/:id", async(req,res) =>{
    try{
      const user = await User.findById(req.params.id)
      const {password, ...other} = user._doc
      res.status(200).json(other)
    }catch(error){
        res.status(400).json(error)
    }
})
module.exports = router