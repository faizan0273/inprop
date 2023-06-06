const mongoose= require('mongoose');

const {Schema}= mongoose;

const agentSchema= Schema({
    name:{
        require:true,
        type:String
    },
    nationality:{
        require:true,
        type:String
    },
    language:{
        require:true,
        type:String
    },
    propertyForSale:{
        require:true,
        type:Number
    },
    profilePicture:{
        require:true,
        type:String
    },
    companyName:{
        require:true,
        type:String
    },
},
{timestamps:true}
);

module.exports=mongoose.model('agentSchema',agentSchema);