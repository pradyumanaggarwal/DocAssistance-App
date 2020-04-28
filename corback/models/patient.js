const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      //required: true,
      maxlength: 2000
    },
    doctor: {
      type: ObjectId,
      ref: "User",
      //required: true
    },
    address: {
        type: String,
        trim: true,
        //required: true,
        maxlength: 2000
    },
    contact: {
        type: String,
        trim:true,
       // required:true
    },
    tested: {
        type: Boolean,
        default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
