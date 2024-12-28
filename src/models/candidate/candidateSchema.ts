import mongoose from "mongoose"

const candidateSchema=new mongoose.Schema({
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
    mobile:{
        required:true,
        type:String
    },
    profileUrl:{
        required:true,
        type:String
    },
    resume:{
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
const  Candidate=mongoose.model('User',candidateSchema)
export default Candidate;