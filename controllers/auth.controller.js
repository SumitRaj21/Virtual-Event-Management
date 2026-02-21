const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
class AuthController {

    register = asyncHandler(async (req, res) => {
        const user = await authService.register(req);
        res.status(201).json(
            {
                success: true,
                message: "User registered successfully",
                data: user
            }
        )
    });

    login = asyncHandler(async (req, res) => {
        const { token, user } = await authService.login(req);
        res.status(200).json(
            {
                success: true,
                message: "User logged in successfully",
                data: { token, user }
            }
        )
    });
    userList = asyncHandler(async (req, res) => {
        const users = await authService.userList(req);
        res.status(200).json(
            {
                success: true,
                message: "Users listed successfully",
                data: users
            }
        )
    });
}

module.exports = new AuthController();