const mongoose= require('mongoose');

const {Schema}= mongoose;

const projectSchema= Schema({
    deliveryYear:{
        require:true,
        type:String
    },
    projectName:{
        require:true,
        type:String
    },
    developerName:{
        require:true,
        type:String
    },
    bedroom:{
        require:true,
        type:Number
    },
    area:{
        require:true,
        type:Number
    },
    bathroom:{
        require:true,
        type:Number
    },
    address:{
        require:true,
        type:String
    },
    
},
{timestamps:true}
);

module.exports=mongoose.model('projectSchema',projectSchema);