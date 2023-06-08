const mongoose= require('mongoose');

const {Schema}= mongoose;

const propertySchema= Schema({
    title:{
        require:true,
        type:String
    },
    address:{
        require:true,
        type:String
    },
    companyName:{
        require:true,
        type:String
    },
    description:{
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
    price:{
        require:true,
        type:Number
    },
    propertyImages:{
        require:true,
        type:Array
    }
},
{timestamps:true}
);

module.exports=mongoose.model('propertySchema',propertySchema);