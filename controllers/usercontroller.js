// const user = require("../routes/userroute")
const userModel = require("../models/user")

exports.index= (req,res,next)=>{
    userModel.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:'an error'
        })
    })
}
exports.show = (req, res, next)=>{
    let userId=req.body.userId
    userModel.findById(userId)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({

            message:'an error'
        })
       
    })
}

//add new user

exports.Store= async (req, res, next)=>{
    let users = new userModel({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password

    })
    users.save()
    .then(response=>{
        res.json({
            message:'user added successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'an error'
        })
    })
}

//update an user

exports.update= (req, res, next)=>{
    let userId = req.body.userId
    letupdateData={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    }

    userModel.findByIdAndUpdate(userId,{$set:updateData})
    .then(()=>{
        res.json({
            message:'user updated successfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'an error'
        })
    })

}

//delete an user

exports.destroy= (req, res, next)=>{
    let userId = req.body.userId
    user.findByIdAndRemove(userId)
    .then(()=>{
        req.json({
            message:'user deleted'
        })
    })
    .catch(error=>{
        req.json({
            message:'an error'
        })
    })
}

// module.exports={
//     index,show,update,destroy
// }
