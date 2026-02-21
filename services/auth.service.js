const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class AuthService {

    register = async (req) => {
        const { username, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, 'User already exists with this email');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        return newUser;
    }

    login = async (req) => {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, 'Invalid email or password');
        }
        // Check password   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(400, 'Invalid email or password');
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        return { token, user };
    }
    userList = async () => {
        const users = await User.find().select('-password');
        return users;
    }
}

module.exports = new AuthService();