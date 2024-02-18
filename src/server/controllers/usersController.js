const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAuthToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY || "your-default-secret-key";
  console.log(secretKey);
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "10h" });
  return token;
};


module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({
        msg: "Please provide all required fields",
        status: false,
      });
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = generateAuthToken(user._id);

    return res.status(201).json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.json({ msg: "Email not found", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Incorrect password");
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const token = generateAuthToken(user._id);

    delete user.password;
    return res.status(200).json({ status: true, user, token });
  } catch (ex) {
    console.error("Error during login:::", ex);
    next(ex);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.find({_id: {$ne: req.params.id}}).select(["username","_id","email","dob","mobile","country","state","religion","age"]);
    console.log(user);
    return res.json(user);

  } catch (ex) {
    console.error("Error fetching user by ID:", ex);
    next(ex);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const { username, age, dob, country, state, religion } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId, // Fix the reference to req.params.userId
      { username, age, dob, country, state, religion },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(updatedUser);
  } catch (ex) {
    console.error("Error updating user profile:", ex);
    next(ex);
  }
};

module.exports.viewUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select([
      "username",
      "email",
      "dob",
      "mobile",
      "country",
      "state",
      "religion",
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (ex) {
    console.error("Error fetching user profile:", ex);
    next(ex);
  }
};

module.exports.updateLastAttempted = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { last_attempted: new Date(), testGiven: true },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }


}

module.exports.submitTest = async (req, res) => {
  try {
    console.log("Received POST request at /api/user/score/:userId");
    const userId = req.params.userId;
    const selectedOptions = req.body.selectedOptions;

    // Retrieve questions array from the request body
    const questions = req.body.questions;

    // Check if questions array is valid
    if (!questions || !Array.isArray(questions)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing questions array" });
    }

    const userScore = calculateScore(selectedOptions, questions);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { score: userScore } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Test submitted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const calculateScore = (selectedOptionsMap, questions) => {
  const selectedOptions = Object.values(selectedOptionsMap);

  if (!Array.isArray(selectedOptions)) {
    console.error("Invalid or missing selected options array");
    return 0; // or handle the error accordingly
  }

  if (!Array.isArray(questions)) {
    console.error("Invalid or missing questions array");
    return 0; // or handle the error accordingly
  }

  const score = selectedOptions.reduce((totalScore, selected, index) => {
    const correctAnswer = questions[index].correctAnswer;

    // If the selected option matches the correct answer, add 1 to the total score
    if (selected === correctAnswer) {
      return totalScore + 1;
    }

    return totalScore;
  }, 0);

  return score;
};

module.exports.updateImage = async (req, res) => {
  const userId = req.params.userId;
  const image = req.file.filename;

  try {
    // Update the user details with the new image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: `src/server/images/${image}` }, // Update the path accordingly
      { new: true } // This option ensures you get the updated user details in the response
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user image:", error);
    res.status(500).json({ error: "Error updating user image" });
  }
};
