const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
dotenv.config({ path: "./routes/.env" })
app.use(express.json())
mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use("/auth", authRoute)
  app.use("/users", authUser)
  app.use("/posts",authPost)
app.listen("5000",() => {
    console.log("backend running");
})
