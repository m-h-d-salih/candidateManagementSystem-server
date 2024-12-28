import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        
    },
    password:{
        required:true,
        type:String
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date
    },
},
{
    timestamps: true,
  }
)
const  Admin=mongoose.model('Admin',adminSchema)
export default Admin