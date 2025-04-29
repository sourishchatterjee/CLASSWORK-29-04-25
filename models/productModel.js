const mongoose = require("mongoose");
//const { applyTimestamps } = require("./userModel");

const productSchema = mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true, 
  },
  productname: {
    type: String,
    require: [true, "product name is required"],
    maxlength: [100, "product cannot be more biger than 100"],
  },

  productdetail: {
    type: String,
    require: [true, "product details is required"],
    maxlength: [100, "product cannot be more than 100"],
  },

  productprice: {
    type: Number,
    require: [true, "product price is required"],
  },
  isDeleted:{
    type:Boolean,
    default:false,

}
  
 
},{
  versionKey:false,
   timestamps:true,
});

module.exports = mongoose.model("product", productSchema);
