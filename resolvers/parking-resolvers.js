
const Parking = require('../models/parking');
const Booking=require("../models/booking")

//for responsable
exports.getMyParkings=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isResponsable) return {status:403,error:"access is forbidden "}
    try
    {
        let parkings=await Parking.find({responsable:req.user._id})
        .populate({
            path: "cars",
            populate: { path: "owner", select: "name username email tel avatar" },
        })
        if(!parkings) return {status:404,error:"not found"}
        return {status:200, parkings:parkings}
    }
    catch(ex)
    {
         return {status:500,error:"server error"}
    }
}

exports.getParkings=async()=>{
    try{
        let parkings=await Parking.find().populate('responsable');
        if(!parkings) return {status:404,error:"not found"}
        return {status:200, parkings:parkings}
    }
     catch(ex)
     {
         return {status:500,error:"server error"}
     }
}

exports.getParking=async(parent, args)=>{
 try{
    let parking=await Parking.findById(args.parkingid).populate('responsable');
     if(!parking) return {status:404,error:"not found"} 
     return {status:200,parking:parking}
}
 catch(ex)
 {
     return {status:500,error:"server error"}
 }
}

//for admin
exports.createParking=async(parent, args, req)=>{
    console.log(args)
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"access is forbidden "}
    try
    {
        console.log(args)
        const parking = new Parking({
            name:args.createParkingInput.name,
            description: args.createParkingInput.description,
            address:args.createParkingInput.address,
            images: args.createParkingInput.images,
            price: args.createParkingInput.price,
            capacity: args.createParkingInput.capacity,
            nb_places_avaible:args.createParkingInput.capacity,
            responsable:args.createParkingInput.responsable
        })
        let createdParking=await parking.save()
        createdParking=await Parking.findById(createdParking._id).populate("responsable")
        if(!createdParking) return {status:500,error:"failed creation"}
        return {status:201,parking:createdParking}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
}

exports.deleteParking=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"access is forbidden "}
    try{
        let deletedParking= await Parking.findByIdAndDelete(args.parkingid)
        let Bookings=await Booking.find({parking:args.parkingid})
        Bookings.map(async(booking)=>await booking.remove())
        if(!deletedParking) return {status:404,error:"not found"}
        return {status:200,parking:deletedParking}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
    
}

