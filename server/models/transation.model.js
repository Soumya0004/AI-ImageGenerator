import mongoose from "mongoose";

const transationSchema = new mongoose.Schema({
   
  userId:{
    type:String,
    require:true
  },
  plan:{
    type:String,
    require:true
  },
  credits:{
    type:Number,
    require:true
  },
  amount:{
    type:Number,
    require:true
  },
  payment:{
    type:Boolean,
    default:false
  },


  date:{
    type:Number,
    
  }

})
const transationModel =mongoose.models.transation || mongoose.model('transation', transationSchema)
export default transationModel;
   