const usermodel=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const userModel = require("./../Models/userModel");
// const questionModel = require("../Models/questionModel");
const decode = require("jwt-decode");


exports.register =(req,res,next)=>{
    //  const salt = await bcrypt.genSalt(10)
    bcrypt.hash(req.body.password,10,function(err,hashedpass){
        if(err){
            res.json({
                error:err
            })
        }
        let user=new usermodel({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedpass,
            
            
        })
        user.save()
        .then(user=>{
            res.json({
                message:'user added successfully'
            })
            // const salt = await bcrypt.genSalt(10)
        })
        .catch(error=>{
            res.json({
                message:'an error'
            })
        })
    })

   
}


exports.login=(req,res,next)=>
{
    var username=req.body.username
    var password=req.body.password

    usermodel.findOne({email:username})
    .then(user=>{
        // return user
        if(user){

        
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token= jwt.sign({name:usermodel.name},'verysecretvalue',{expiresIn:'1h'})
                    res.json({
                        message:'login successful',
                        token
                    })
                }
                else{
                    res.json({
                        message:'password does not match'
                    })
                
                }
            })
        }else{
            res.json({
                message:"no user found"
        })
        }
    })

    // const changepwrd=async(req,res)=>{
    //     const{name,email,phone,password}=req.body
    //     if(username!==email){
    //         res.send({"status":"failed","message":"username and email doesnot match"})

    //     }
    //     else{
    //         const salt=await bcrypt.genSalt(10)
    //         const hashedpass=await bcrypt.hash(password,salt)
    //         // bcrypt.hash(req.body.password,10,function(err,hashedpass,salt)

    //         res.send({"status":"success","message":"all fields are changed successfully"}
    //         )
    //     }
    // }
}


// const changepwrd=async(as)


// module.exports={
//     register,login
// }



 


    
// verifyToken = (req, res, next) => {
//   try {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined" || bearerHeader !== null) {
//       const bearer = bearerHeader.split(" ");

//       const bearerToken = bearer[1];
//       req.tokenObject = bearerToken;
//       jwt.verify(bearerToken, process.env.JWT_SECRET_LOGIN);
//       next();
//     }
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized " });
//   }
// };

exports.updateProfile = async (req, res) => {


    
verifyToken = (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (typeof bearerHeader !== "undefined" || bearerHeader !== null) {
        const bearer = bearerHeader.split(" ");
  
        const bearerToken = bearer[1];
        req.tokenObject = bearerToken;
        jwt.verify(bearerToken, process.env.JWT_SECRET_LOGIN);
        // next();
      }
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized " });
    }
  };
  // jwt.verify(req.token,verysecretvalu,(err))
    try {
        
        // return res.send({

        //     key :req.headers
        

        // })

      const id = decode(req.token).id
      const id =(req.headers)
      console.log(id.id)
      console.log(id.email)
  
      
      let data = req.body;
  
      usermodel.find(
        { $and: { id: id }},
        async (err, userResult) => {
          if (err) {
            return res.status(400).json({ message: err });
  
          }
  
          if (userResult.length) {
            usermodel.find(
              { $and: { email: data.email } },
              async (err, Result) => {
                if (err) {
                  return res.status(400).json({ message: err });
                }
  
                // if (Result.length) {
                //   if (Result[0]._id.toString() !== id) {
                //     return res.send({
                //       code: 400,
                //       message: "This email is associated with another user",
                //     });
                //   }
                // }
  
  
                usermodel.findOneAndUpdate(
                  {
                    $and: [{ id: id }],
                  },
                  {
                    name: data.name,
                    email: data.email,
                    // city: data.city,
                    // class: data.class,
                    // school: data.school,
                    // profilePic: data.image
                    phone:data.phone,
                    password:data.password,
                  },
                  { new: true },
                  (err, updateresult) => {
                    if (err) {
                      return res.status(400).json({ message: err });
  
                    }
                    if (updateresult) {
  
                      return res.status(200).send({
                        message: "successfully updated",
                      });
                    } else {
                      return res.status(400).send({
                        message: "updation failed",
                        code: 400,
                      });
                    }
                  }
                );
  
              }
            );
          } else {
            return res.status(400).send({
              message: "data not found",
              code: 400,
            });
          }
        }
      );
    } catch (err) {
      return res.status(400).json({ message: err });
  
    }
  };



  ////....................


 
  

//   function verifytoken(req,res,next){
//     const bearerheader=req.headers['authorization']
//     if(typeof bearerheader!=='undefined'){
//         const bearer=bearerheader.split("");
//         const token=bearer[1];
//         req.token=token;

//     }else{
//         resp.send({
//             result:'token not valid'
//         })
//     }
//   }