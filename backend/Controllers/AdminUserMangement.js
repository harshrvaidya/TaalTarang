const User=require('../models/User');

const getUsers=async(req,res)=>{
    User.find({}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
}


module.exports = { getUsers};