const bcrypt = require('bcrypt');
const Parking = require('../models/parking');
const User = require('../models/user');


exports.createUser=async(parent,args,req)=>{
    
    if((args.createUserInput.type==="admin" && !req.isAdmin) ||
       (args.createUserInput.type==="responsable" && !req.isAdmin)) return {status:403,error:"Forbidden"}
    try{
        const user = new User({
            email: args.createUserInput.email,
            name: args.createUserInput.name,
            username: args.createUserInput.username,
            password: args.createUserInput.password,
            tel:args.createUserInput.tel,
            type:args.createUserInput.type,
            avatar:args.createUserInput.avatar
        })
        
        
        const hashedpass=await bcrypt.hash(args.createUserInput.password, 11)
        
        user.password=hashedpass;
        let userCreated=await user.save();
        

        if(!userCreated) return {status:500,error:"user already exist"}
        return {status:201,user:userCreated};
    }
    catch(ex)
    {
        return {status:500,error:"Internal Server Error"}
    }
    

}

exports.userLogin=async(parent,args)=>{
    try{
        const user = await User.findOne({ email: args.loginUserInput.email });
        if(!user) return { status: 404 ,error:"invalid username"}
        const result = await bcrypt.compare(args.loginUserInput.password, user.password);
        if(result) return {status:200, user:user, token:user.generateAuth()}
        return { status: 401,error:"invalid password"}
     }
     catch(ex)
     {
         return {status:500,error:"Internal Server Error"}
     }
}

exports.deleteUser=async(parent,args)=>{
    try{
        let deletedUser=await User.findByIdAndDelete(args.userid)
        if(!deletedUser) return {status:404,error:"not found"}
        return {status:200,user:deletedUser}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
    
}

//for admin
exports.getUsers=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401,error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"forbidden"}
    try
    {
        let users=await User.find()
        if(!users) return {status:404,error:"not found"} 
        return {status:200, users:users}  
    }
     catch(ex)
     {
        return {status:500,error:"serve error"}
     }
}

//for admin 
exports.getLazyResposables=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401,error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"forbidden"}

    try{
         let parkings=await Parking.find().populate("responsable").select("-responsable._id")
         let responsableIds=parkings.map(parking=>parking.responsable._id)
         let responsables=await User.find({type:"responsable",_id :{$nin: responsableIds}})
         return {status:200,users:responsables}
    }
    catch(err)
    {
        return {status:500,error:"serve error"}
    }
}


exports.getUser=async(parent,args)=>{
    try{
        let user=await User.findById(args.userid)
        if(!user) return {status:404,error:"not found"}
        return {status:200,user:user} 
    }
     catch(ex)
     {
        return {status:500}
     }
}

exports.updateUser=async(parent,args,req)=>{
    if (!req.isAuth) return {status:401,error:"User is not Authenticated"}
    
    try 
    {
        console.log(req.user._id)
        let oldUserSetting = await User.findOneAndUpdate({_id:req.user._id},
            { $set: { username: args.updateUserInput.username,
                      name: args.updateUserInput.name,
                      email: args.updateUserInput.email,
                      tel:args.updateUserInput.tel,
                      avatar:args.updateUserInput.avatar
                    }
            }
        )
        const user=await User.findById(req.user._id)
        if(!oldUserSetting) return {status:404,error:"user not found"}
        return {status:200,user:user}
    } 
    catch (error) 
    {
        return {status:500,error:"server error"}
    }
}

exports.updateUserByAdmin=async(parent,args,req)=>{
    if (!req.isAuth) return {status:401,error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"forbidden"}
    try 
    {
        console.log(req.user._id)
        let oldUserSetting = await User.findOneAndUpdate({_id:args.updateUserInput.id},
            { $set: { username: args.updateUserInput.username,
                      name: args.updateUserInput.name,
                      email: args.updateUserInput.email,
                      tel:args.updateUserInput.tel,
                      avatar:args.updateUserInput.avatar
                    }
            }
        )
        const user=await User.findById(req.user._id)
        if(!oldUserSetting) return {status:404,error:"user not found"}
        return {status:200,user:user}
    } 
    catch (error) 
    {
        return {status:500,error:"server error"}
    }
}

exports.updateUserPassword=async(parent,args,req)=>{
    
    if (!req.isAuth) return {status:401,error:"User is not Authenticated"}
    console.log(req.user._id)
    try 
    {
        let user = await User.findById(req.user._id);
        let result = await bcrypt.compare(args.updateUserPasswordInput.oldpassword, user.password);
        if (!result) return {status:401,error:"Authenticated failed old password incorrect"}
        let hashedpass = await bcrypt.hash(args.updateUserPasswordInput.newpassword, 11);
        await User.updateOne({ _id: req.user._id }, { $set: { password: hashedpass } })
        console.log(user)
        return {status:200,user:user,message:"Password Successfully changed"}   
    } 
    catch (err) 
    {
            return {status:500,error:"erreur connection"}
    }

}
