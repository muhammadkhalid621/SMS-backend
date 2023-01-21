const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transporter = require("../helpers/Email");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const URL = process.env.APP_URL;

async function Register(req, res) {
  try {
    // Check if the email is already in use
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ error: "Email is already in use" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    await newUser.save();

    // Generate a JWT and send it to the client
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Error registering user" });
  }
}

async function Login(req, res) {
  try {
    // Look up the user by email
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email, req.body.password)
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    // Generate a JWT and send it to the client
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    };
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "Error logging in" });
  }
}

async function ResetPassword(req, res) {
  try {
    // Look up the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ error: "No account with that email exists" });
    }

    // Generate a reset token and expiration date
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiration = Date.now() + 3600000; // 1 hour from now
    user.resetToken = resetToken;
    user.resetExpiration = resetExpiration;
    await user.save();

    // Send an email with a link to reset the password
    const resetUrl = `${URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                 <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                 <p>${resetUrl}</p>
                 <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    });
    res.send({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).send({ error: "Error sending password reset email" });
  }
}

async function ResetPasswordToken(req, res) {
  try {
    // Look up the user by the reset token and expiration date
    const user = await User.findOne({
      resetToken: req.params.token,
      resetExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .send({ error: "Password reset token is invalid or has expired" });
    }

    // Hash the new password and update the user's password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetExpiration = undefined;
    await user.save();

    // Generate a JWT and send it to the client
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: "Error resetting password" });
  }
}

async function ForgotPassword(req, res) {
  try {
    // Look up the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ error: "No account with that email exists" });
    }

    // Generate a reset token and expiration date
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiration = Date.now() + 3600000; // 1 hour from now
    user.resetToken = resetToken;
    user.resetExpiration = resetExpiration;
    await user.save();

    // Send an email with a link to reset the password
    const resetUrl = `${URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                 <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                 <p>${resetUrl}</p>
                 <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    });
    res.send({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).send({ error: "Error sending password reset email" });
  }
}

module.exports = {
  Register,
  Login,
  ResetPassword,
  ResetPasswordToken,
  ForgotPassword,
};
