const mongoose = require("mongoose");
class MongoManager {
  constructor(opts) {
    this.opts = opts;
  }
  
  getMongoUrl() {
    return process.env.MONGODB
  }

  /**
   * Used to connect to Mongo DB
   * @returns mongoose connect object
   */
  connect() {
    return mongoose
      .connect(this.getMongoUrl(), this.opts)
      .then(() => {
        console.log(`Connected to database:`+this.getMongoUrl());
      })
      .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
      });
  }
}
module.exports = { MongoManager };
