const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sceduleLogSchema = new Schema(
  {
      scheduleId:{
        type:Schema.Types.ObjectId,
        ref:'Scedule',
        required:[true,"Scedule Id is required"],
      },
      status:{
        type:Boolean,
        reequired:[true,"Status is required"]
      },
      response:{
        type:String,
        required:[true,"Node Mailer Response is required"]
      }
  },
  { timestamps: true },
  { minimize: false }
);


module.exports = mongoose.model("ScheduleLog", sceduleLogSchema)