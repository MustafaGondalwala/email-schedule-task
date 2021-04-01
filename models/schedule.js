const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sceduleSchema = new Schema(
  {
      from:{
          type:String,
          required:[true,'From is required']
      },
      to:{
        type:String,
        required:[true,'To is required']
      },
      subject:{
        type:String,
        required:[true,'Subject is required']
      },
      message:{
        type:String,
        required:[true,'Message is required']
      },
      sceduledAt:{
        type:Date,
        required:[true,"Scedule At is required"]
      }
  },
  { timestamps: true },
  { minimize: false }
);


module.exports = mongoose.model("Scedule", sceduleSchema)