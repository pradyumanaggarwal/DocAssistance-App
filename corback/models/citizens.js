var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var citizenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    tested: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        //required: true
    },
    contact: {
        type: String,
        //required: true,
    },
    checkedby: {
        type:ObjectId,
        ref: "Hospital",
        //required:true,
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model("Citizen", citizenSchema);
