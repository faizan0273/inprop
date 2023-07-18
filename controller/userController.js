const User = require('../models/userSchema');

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
};

module.exports = userController;
