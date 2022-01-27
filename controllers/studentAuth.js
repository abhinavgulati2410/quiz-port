const Student = require("../models/Students");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const Quizes = require("../models/Quizes");
const Course = require("../models/Courses");

// @desc register student
// @route POST /signup
// @access PUBLIC

module.exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, _id } = req.body;

    //Checking if the student is already registered
    const student = await Student.findOne({ email });

    if (student) {
        return next(
            new ErrorResponse("Student with that email already exists", 400)
        );
    }

    //If not , then save the student
    const hashedPass = await bcrypt.hash(password, 10);

    let quizes = [];
    let courses = [];

    const savedQuizes = await Quizes.find({});
    const savedCourses = await Course.find({});

    savedQuizes.map((quiz) => {
        quizes.push(quiz._id);
    });

    savedCourses.map((notice) => {
        courses.push(notice._id);
    });

    const newStudent = new Student({
        _id,
        name,
        email,
        password: hashedPass,
        quizes,
        courses,
    });

    const savedStudent = await newStudent.save();

    sendResponse(savedStudent, "Student registered Successfully", res);
});

// @desc login student
// @route POST /signin
// @access PUBLIC

module.exports.signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;

    //Checking if students has registered or not
    const student = await Student.findOne({ email });

    if (!student) {
        return next(new ErrorResponse("Student is not registered", 400));
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (isMatch) {
        const token = jwt.sign(
            {
                _id: student._id,
            },
            secret
        );

        // const { _id, name, email, type } = student;
        // : { _id, name, email, password, type },

        res.json({
            token,
            student,
        });
    } else {
        return next(new ErrorResponse("Sorry, Incorrect Email/Password", 400));
    }
});

// @desc dashboard
// @route GET /dashboard
// @access Private

module.exports.dashboard = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.student._id);
    sendResponse(student, "Protected Page", res);
});
