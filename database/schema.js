const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        //required:true
    },
    description:{
        type:String,
        required:true
    }

})

const feedback = mongoose.model('feedback',schema)

module.exports=feedback