const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    tel:{  type: String, required: true},
    type:{ type: String, enum : ['client','admin',"responsable"] ,required:true},
    avatar:{ type:String, required:true }
})

UserSchema.methods.generateAuth = function () {
    return jwt.sign(
      { _id: this._id, username:this.username, type:this.type },
         process.env.JWT
    );
  };

module.exports = mongoose.model('User', UserSchema)