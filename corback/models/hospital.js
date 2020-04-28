var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    doctor: [{
        type:ObjectId,
        ref: "User"
    }]
  },
  { timestamps: true }
);



module.exports = mongoose.model("Hospital", hospitalSchema);
