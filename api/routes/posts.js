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
     if(post.username === req.body.username){
        try{
            const upadtePost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set :req.body
                },
                {
                    new:true,
                }
            )
            res.status(200).json(upadtePost)
        }catch(error){
            res.status(200).json(error)
        }
     }else{
        res.status(401).json("You can update only your post!")
     }
    }catch(error){
        res.status(500).json(error)
    }
})
// delete
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
          try {
            await post.delete()
            res.status(200).json("post has been deleted")

          } catch (error) {
            res.status(500).json(error)
          }
        }else{
            res.status(401).json("You can delete only your post!")  
        }
    }catch(error){
        res.status(500).json(error)
    }
})
// get post
router.get("/", async(req,res)=>{
const username = req.query.user
const catName = req.query.cat
try {
    let posts
    if(username){
        posts = await Post.find({username:username})
    }else if(catName){
        posts = await Post.find({
        categories:{
            $in: [catName],
        },
            })
    }else{
        posts = await Post.find()
    }
    res.status(404).json(posts)
} catch (error) {
    res.status(404).json(error) 
}
})
module.exports = router