const mongoose= require('mongoose');

const {Schema}= mongoose;

const adminSchema= Schema({
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
},
{timestamps:true}
);

module.exports=mongoose.model('adminSchema',adminSchema);