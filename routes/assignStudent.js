const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const {
  submitQuiz,
  getCourses,
  getStudent,
  getQuiz,
} = require("../controllers/assignStudent");

router.post("/submitQuiz", requireLogin, submitQuiz);
router.get("/getCourses", requireLogin, getCourses);
router.get("/getStudent", requireLogin, getStudent);
router.post("/getQuiz", requireLogin, getQuiz);

module.exports = router;
