// Middleware for handling auth
const {Admin}=require("../db")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
 const username=req.headers.username;
 const password=req.headers.password;
 console.log(username);
 console.log(password);
 Admin.findOne({
    username :username,
    password:password
      
 }).then(function(value){
    if(value){
        next();
    }
    else{
        res.status(403).send({message:"Invalid username or password"});
    }
 }).catch(err=>res.json({msg:"user not exist"}));
}

module.exports = adminMiddleware;