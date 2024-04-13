const authpage =(Permissions)=>{
    return (req,res,next)=>{
 const username = req.body.username;
 const password = req.body.password;
 if(Permissions.includes(username,password)){
next()
 }
 else{
    res.status(401).send("you are not allowed to access this page");

 }
    }   
};
module.exports = authpage;