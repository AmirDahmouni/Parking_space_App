
const booking = require('../models/booking');
const Car = require('../models/car');

//for client
exports.getMyCars=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try{
        let cars=await Car.find({owner:req.user._id}).populate('owner')
        if(!cars) return {status:404,error:"not found"}
        return {status:200, cars:cars}
    }
     catch(ex)
     {
         return {status:500,error:"server error"}
     }
}
//for client 
exports.getMyCarsnotParked=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try
    {
       let idParkedCars=await booking.find({user:req.user._id}).select("car")
       idParkedCars=idParkedCars.map(car=>car.car)
       
       let notParkedCars=await Car.find({owner:req.user._id,_id:{$nin:idParkedCars}})
       if(!notParkedCars) return {status:404,error:"not found "}
       return {status:200,cars:notParkedCars} 
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
}
exports.getCar=async(parent, args,req)=>{
 try{
    let car=await Car.findById(args.carid).populate('owner');
     if(!car) return {status:404,error:"not found"} 
     return {status:200,car:car}
}
 catch(ex)
 {
     return {status:500,error:"server error"}
 }
}

exports.createCar=async(parent, args, req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try
    {
    
        
        const car = new Car({
        registration_number:args.createCarInput.registration_number,
        brand: args.createCarInput.brand,
        description: args.createCarInput.description,
        category:args.createCarInput.category,
        color: args.createCarInput.color,
        owner: req.user._id
        })
        
        let createdCar=await car.save()
        if(!createdCar) return {status:500,error:"failed creation"}
        return {status:201,car:createdCar}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
}
exports.deleteCar=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try{
        let car=await booking.findOne({car:args.carid,user:req.user._id})
        if(car) return {status:404,error:"can not delete parked car"}
        let deletedCar= await Car.findOneAndRemove({_id:args.carid,owner:req.user._id})
        if(!deletedCar) return {status:404,error:"not found"}
        return {status:200,car:deletedCar}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
    
}

