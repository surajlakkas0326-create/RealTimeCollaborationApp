const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({

  user:{
    type:String,
    required:true
  },

  text:{
    type:String,
    required:true
  },

  time:{
    type:String,
    default: () => new Date().toLocaleTimeString()
  }

},
{
  timestamps:true
})

module.exports = mongoose.model("Message",MessageSchema)