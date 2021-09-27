const Booking=require("../models/booking")
const Parking=require("../models/parking")
//for admin
exports.getAllBookings=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401,error:"User is not Authenticated"}
    if(!req.isAdmin) return {status:403,error:"forbidden"}
    try{
        let bookings=await Booking.find().populate('car').populate('parking').populate('user');
        if(!bookings) return {status:404,error:"not found"}
        return {status:200, bookings:bookings}
    }
     catch(ex)
     {
         return {status:500,error:"server error"}
     }
}

//for resposable parking
exports.getMybookingsParkings=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401,error:"User is not Authenticated"}
    if(!req.isResponsable) return {status:403,error:"forbidden"}

    let myparkings=await Parking.find({responsable:req.user._id})
    if(!myparkings) return {error:404,error:"not found"}
    myparkings=myparkings.map(parking=>parking._id);
    
    let bookings=await Booking.find({ parking: { $in:myparkings } }).populate('user').populate("car").populate("parking")
    if(!bookings) return {status:404,error:"not found"}

    return {status:200,bookings:bookings}
}

//for client
exports.getMyBookings=async(parent,args,req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try{
        let bookings=await Booking.find({user:req.user._id}).populate('car').populate('parking');
        if(!bookings) return {status:404,error:"not found"}
        return {status:200, bookings:bookings}
    }
     catch(ex)
     {
         return {status:500,error:"server error"}
     }
}

//for all users
exports.getBooking=async(parent, args)=>{
 try
 {
    let booking=await Booking.findById(args.bookingid).populate('car').populate('parking').populate("user");
     if(!booking) return {status:404,error:"not found"} 
     return {status:200,booking:booking}
 }
 catch(ex)
 {
     return {status:500,error:"server error"}
 }
}

//for client
exports.createBooking=async(parent, args, req)=>{
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isClient) return {status:403,error:"forbidden"}
    try
    {
        let parking=await Parking.findById(args.createBookingInput.parking)
        if(parking.nb_places_avaible===0) return {status:406,error:"NOT_ACCEPTABLE"}
        const booking = new Booking({
            description: args.createBookingInput.description,
            start:args.createBookingInput.start,
            end:args.createBookingInput.end,
            total_price:args.createBookingInput.total_price,
            parking:args.createBookingInput.parking,
            car:args.createBookingInput.car,
            user:req.user._id
        })
        await Parking.findByIdAndUpdate(args.createBookingInput.parking,
            {$push: {cars:args.createBookingInput.car},$inc:{nb_places_avaible:-1}})
        let createdBooking=await booking.save()
        if(!createdBooking) return {status:500,error:"failed creation"}
        return {status:201,booking:createdBooking}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
}

//for responsable
exports.deleteBooking=async(parent,args,req)=>{
    
    if(!req.isAuth) return {status:401, error:"User is not Authenticated"}
    if(!req.isResponsable && !req.isAdmin) return {status:403,error:"forbidden"}
    try{
        let booking=await Booking.findById(args.bookingid)
        console.log("deleting booking")
        await Parking.findByIdAndUpdate(booking.parking,
            {$pull: {cars:booking.car},$inc:{nb_places_avaible:1}})
        await booking.remove();
        if(!booking) return {status:404,error:"not found"}
        return {status:200,booking:booking}
    }
    catch(ex)
    {
        return {status:500,error:"server error"}
    }
    
}

