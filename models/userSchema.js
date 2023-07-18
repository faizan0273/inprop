const mongoose= require('mongoose');

const {Schema}= mongoose;

const userSchema= Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    type:{
        type:String,
        enum:['sourcer','investor']
    },
},
{timestamps:true}
);

module.exports=mongoose.model('userSchema',userSchema);

