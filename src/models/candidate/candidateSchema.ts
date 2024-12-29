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
    phone:{
        required:true,
        type:String
    },
    profileUrl:{
        
        type:String
    },
    resume:{
      
        type:String
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