const mongoose = require ('mongoose')

const ImageSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc : {
        type:String,
        required:true,
    },
    img : {
        type:String,
    }
});

module.exports = new mongoose.model('image',ImageSchema)