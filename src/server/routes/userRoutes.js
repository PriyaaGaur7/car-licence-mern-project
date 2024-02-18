const {
  signup,
  login,
  updateUserProfile,
  viewUserProfile,
  updateLastAttempted,
  submitTest,
  updateImage, // Import the updateImage function
} = require("../controllers/usersController");
const multer = require("multer");
const {v4: uuidv4} = require('uuid');
const path = require("path");
let User = require('../model/userModel');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,"images");
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
}); 

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/viewprofile/:userId", viewUserProfile);
router.put("/updateprofile/:userId", updateUserProfile);
router.get("/testdetails/:userId", updateLastAttempted);
router.put("/testdetails/:userId", updateLastAttempted);
router.post("/score/:userId", submitTest);
router.post("/upload-image/:userId", upload.single("image"), updateImage);


router.route('/rec').get((req,res) => {
  User.find()
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;
