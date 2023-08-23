const router = require("express").Router();
const Post = require("../model/Post")
// create post
router.post("/", async(req,res)=>{
    const newPost = new Post(req.body)

    try{
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    }catch(error){
      res.status(500).json(error)
    }
})
// update post
router.put("/:id", async(req,res)=>{
    try{
     const post = await Post.findById(req.params.id)
    }catch(error){

    }
})
module.exports = router