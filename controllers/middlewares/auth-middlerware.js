const jwt = require("jsonwebtoken");
// // import jwt from ' jsonwebtoken'
// // const jwt=require('jsonwebtoken')

// const userModel = require("../models/user")
// // import user from '../models/user.js'


// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const decode = require("jwt-decode");


// var checkuserauth=async(req,res,next)=>{
//     let token1
//     const{authorization}=req.headers
//     if(authorization && authorization.startswith('Bearer')){
//         try{
//             token1=authorization.split(' ')[1]
//             //verify token
//             const{userId}=jwt.verify(token1,erysecretvalue)

//             //get user from token

//             req.user=await userModel.findById(userId)
//             next()


//         }
//         catch(error)
//         {
//             console.log(error)
//             req.send({"status":"failed" ,"message":"unauthorize user"})
//             res
//         }

//     }
//     if(!token1){
//         res.send({"status":"failed" ,"message":"unauthorize user,no token"})
//     }
// }

// // export default checkuserauth


exports.updateProfile = async (req, res) => {
    try {
        
        // return res.send({

        //     key :req.headers
        // })
      const id = decode(req.token).id
  
      
      let data = req.body;
  
      usermodel.find(
        { $and: { id: id }},
        async (err, userResult) => {
          if (err) {
            return res.status(400).json({ message: err });
  
          }
  
          if (userResult.length) {
            userModel.find(
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





exports.verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined" || bearerHeader !== null) {
      const bearer = bearerHeader.split(" ");

      const bearerToken = bearer[1];
      req.tokenObject = bearerToken;
      jwt.verify(bearerToken, process.env.JWT_SECRET_LOGIN);
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized " });
  }
};


// exports.neterr = (req, res, next) => {
//   try {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "net work error " });
//   }
// };
