const express = require("express");
const router = express.Router();
const requireLoginTeacher = require("../middlewares/requireLoginTeacher");
const colors = require("colors");

const {
    signin,
    signup,
    dashboard
} = require("../controllers/teacherAuth")

router.use((req,res,next) => {
    console.log(colors.green(
        `${req.method} request made route ${req.originalUrl} at ${Date.now()}`
    ));
    next();
})

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/dashboard",requireLoginTeacher,dashboard);

module.exports = router;