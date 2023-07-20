const User = require('../models/userSchema');
const Answer = require('../models/investorAnswerSchema');
const Question = require('../models/questionSchema');
const Property = require('../models/propertySchema');
const userController = {
  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const { email } = req.body;
      
      // Check if the user with the given email already exists
      const checkExists = await User.findOne({ email });
      if (checkExists) {
        return res.status(409).json({ message: 'User already exists' });
      }
      
      const user = await User.create(userData);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  async addProperty(req, res, next) {
    try {
      // Logic for adding a property
      const propertyData = req.body;
  
      // Check if there are any files uploaded
      if (req.files && req.files.length > 0) {
        const propertyImages = [];
  
        // Process each uploaded file
        for (const file of req.files) {
          const fileData = fs.readFileSync(file.path);
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
  
          // Upload the file to DigitalOcean Spaces
          const params = {
            Body: fileData,
            Bucket: 'technician',
            Key: filename
          };
  
          await s3.putObject(params).promise();
  
          // Add the image URL to the propertyImages array
          propertyImages.push(`https://dolphin-app-ldyyx.ondigitalocean.app/image/${filename}`);
  
          // Remove the uploaded file
          fs.unlinkSync(file.path);
        }
        // Add the propertyImages array to the propertyData object
        propertyData.propertyImages = propertyImages;
      }
      propertyData.verified=false;
      const property = await Property.create(propertyData);
  
      return res.status(201).json(property);
    } catch (error) {
      next(error);
    }
  },
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      
      // You can add more validation logic here if needed
      const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
    //   const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', id:user._id });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async logout(req, res) {
    try {
      // In case of JWT, there's no need to do anything on the server-side for logout.
      // The client handles the token deletion or expiry.
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async submitAnswersByInvestor(req,res){
    const { investorId, questionId, answer } = req.body;

    try {
      // Check if the user is an investor
      const investor = await User.findById(investorId);
      if (!investor || investor.type !== 'investor') {
        return res.status(401).json({ error: 'Only investors can submit answers.' });
      }
  
      // Check if the question exists
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found.' });
      }
  
      // Save the answer
      const newAnswer = new Answer({
        question: questionId,
        answer: answer,
        investor: investorId,
      });
      await newAnswer.save();
  
      // Associate the answer with the question
      question.answer = newAnswer._id;
      await question.save();
  
      res.status(201).json({ message: 'Answer submitted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  },

// Assuming you have already defined the necessary models and middleware

async getAnswersForSourcer(req, res) {
  try {
    // Find all answers and populate their associated questions and investors
    const answers = await Answer.find()
      .populate({
        path: 'question',
        select: 'question options -_id', // Select question text and options and exclude _id
      })
      .populate({
        path: 'investor',
        select: 'name -_id', // Select investor's name and exclude _id
      });

    // Process the data to show only the relevant information to sourcers
    const questionsAndAnswers = answers.map((answer) => {
      return {
        question: answer.question.question,
        options: answer.question.options,
        answer: answer.answer,
        investor: answer.investor.name,
      };
    });

    res.status(200).json(questionsAndAnswers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

async getAllProperty(req,res,next){
  try {

      const property = await Property.find({ verified: true });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      return res.status(200).json(property);
    } catch (error) {
      next(error);
    }
},



};

module.exports = userController;
