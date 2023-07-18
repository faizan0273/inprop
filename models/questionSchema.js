const mongoose= require('mongoose');

const {Schema}= mongoose;

const questionSchema = Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports=mongoose.model('questionSchema',questionSchema);

