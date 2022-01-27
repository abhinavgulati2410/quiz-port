const Teacher = require("../models/Teachers");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");

// @desc register teacher
// @route POST /signup
// @access PUBLIC

module.exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone } = req.body;

    //Checking if the teacher is already registered
    const teacher = await Teacher.findOne({ email });

    if (teacher) {
        return next(
            new ErrorResponse("Teacher with that email already exists", 400)
        );
    }

    //If not , then save the student
    const hashedPass = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
        name,
        email,
        phone,
        password: hashedPass,
    });

    const savedTeacher = await newTeacher.save();

    sendResponse(savedTeacher, "Teacher registered Successfully", res);
});

// @desc login teacher
// @route POST /signin
// @access PUBLIC

module.exports.signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;

    //Checking if teacher has registered or not
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
        return next(new ErrorResponse("Teacher is not registered", 400));
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (isMatch) {
        const token = jwt.sign(
            {
                _id: teacher._id,
            },
            secret
        );

        // const { _id, name, email, phone, type } = teacher;
        // : { _id, name, email, phone, type },

        res.json({
            token,
            teacher,
        });
    } else {
        return next(new ErrorResponse("Sorry, Incorrect Email/Password", 400));
    }
});

// @desc dashboard
// @route GET /dashboard
// @access Private

module.exports.dashboard = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.teacher._id);
    sendResponse(teacher, "Protected Page", res);
});
