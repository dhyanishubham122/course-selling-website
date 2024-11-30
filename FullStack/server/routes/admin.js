const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
 await Admin.create({
    username:username,
    password:password
 })
 res.json({msg:"admincreted succefully"});
    // Admin.create({
    //     username:username,
    //     password:password
    // }).then(function(){
    //     res.json({msg:"admincreted succefully"});
    // })
    // Admin.findOne({
    //     username :username,
    //     password:password
    //  }).then(function(value){
    //     if(!value){
    //         const newAdmin = new Admin({
    //             username: username,
    //             password: password, // Note: Make sure to hash the password in a real application!
    //         });
    //         newAdmin.save().then(() => {
    //             res.status(201).send({ message: "User created successfully!" });
    //         })
    //         .catch((err) => {
    //             res.status(500).send({ message: "Error saving user", error: err });
    //         });
    //     }
    //     else{
    //         res.status(403).send({message:"user exist"});
    //     }
    //  }).catch((err) => {
    //     res.status(500).send({ message: "Error checking user existence", error: err });
    // });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
 const title=req.body.title;
 const description=req.body.description;
 const imageLink=req.body.imageLink;
 const price=req.body.price;
 console.log("req.body"+req.body);
 const newCourse= await Course.create({
    title:title,
    description:description,
    imageLink:imageLink,
    price:price
   
  })
  console.log(newCourse);
  res.json({msg:"course added succefully",CourseId:newCourse._id});

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
 const response=  await  Course.find({});
        res.json({
            Courses: response
        })
   
});

module.exports = router;