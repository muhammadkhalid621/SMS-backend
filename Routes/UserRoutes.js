const route = require('express').Router();
const user_controller = require('../Controllers/UserController');

route.post('/register', user_controller.Register);
route.post('/login', user_controller.Login);
route.post('/reset-password', user_controller.ResetPassword);
route.post('/forgot-password', user_controller.ForgotPassword);
route.post('/reset-password/:token', user_controller.ResetPasswordToken);

module.exports = route;