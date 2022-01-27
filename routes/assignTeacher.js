const express = require("express");
const router = express.Router();
const {
    makeCourse,
    uploadQuiz,
    getTeacher,
} = require("../controllers/assignTeacher");
const requireTeacherLogin = require("../middlewares/requireLoginTeacher");

router.post("/makeCourse", requireTeacherLogin, makeCourse);
router.post("/uploadQuiz", requireTeacherLogin, uploadQuiz);
router.get("/getTeacher", requireTeacherLogin, getTeacher);

module.exports = router;
