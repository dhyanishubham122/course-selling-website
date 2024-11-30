const { Router } = require("express");
const {User,Course}=require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt =require('jsonwebtoken');
const SECRET_KEY="1234";
router.post('/login',async(req,res)=>{
 const email=req.body.email;
 const password=req.body.password;
 const user=await User.findOne({email,password});
 if(user){

      const token=jwt.sign(
        { userId: user._id, email: user.email,username: user.username }, 
      SECRET_KEY,            
      { expiresIn: '1h' }       
      )


    res.json({message:"Login Succesfully",token});
    }else{
        res.status(404).json({message:"Invalid email or password"});
    }
});
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;
    const user =await User.findOne({email})
     if(user){
        return res.status(400).json({message:"User already exists"})
     }else{
    console.log("email:",email);
    console.log("username:",username);
    await User.create({
        username,
        password,
        email
    })
    res.status(201).send({message:"User created successfully",email});}
});

router.post('/updatepassword',async(req,res)=>{
const email=req.body.email;
const oldpassword=req.body.oldpassword;
const newpassword=req.body.newpassword;
const user=await User.findOne({email});
if(user){
  if(user.password===oldpassword){
    await User.updateOne({email:user.email},{$set:{password:newpassword}});
    res.json({message:"Password updated successfully"});
    }else{
      res.status(404).json({message:"Invalid old password"});
      }
      }
      else{
        res.status(404).json({message:"User not found"});
        }

});


router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response= await Course.find({})
      res.json({courses:response});
});
 router.get('/details',async (req, res) => {
  try{
      const _id=req.query.userid;
      console.log(_id);
      if(!_id){
        return res.status(400).json({message:"Please provide username"});
      }

      const user=await User.findOne({_id});
      console.log(_id);
      if(!user){
      return res.status(400).json({message:"no user found"});
      }
      res.status(200).json(user);
    }
    catch{
      res.status(404).json({message:"User not found"});
    }
 }) ;


router.post('/purchasecourses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    console.log(courseId);
    console.log(username);
    try{
    await User.updateOne({username:username},
        // {purchasedcourses:{"$push":courseId}}
        { "$push": { purchasedcourses: courseId } }
    );}
    catch(e){console.log(e)};
      res.json({msg:"Course purchased successfully"})  
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
   const user= await User.findOne({
    username:req.headers.username
   });
   const courses= await Course.find({
    _id:{
        $in:user.purchasedcourses
    }
   })
   console.log(courses);
   res.json({courses:courses,msg:"hii shubham"});
});

module.exports = router