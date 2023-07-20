const mongoose= require('mongoose');
const {Schema}= mongoose;

const answerSchema = Schema(
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionSchema',
      },
      answer: {
        type: String,
        required: true,
      },
      investor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
      },
    },
    { timestamps: true }
  );
  
module.exports= mongoose.model('Answer', answerSchema);
  