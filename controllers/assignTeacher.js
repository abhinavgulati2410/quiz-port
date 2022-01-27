const Teacher = require("../models/Teachers");
const asyncHandler = require("../middlewares/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const Quizes = require("../models/Quizes");
const Student = require("../models/Students");
const Courses = require("../models/Courses");
const { setMaxListeners } = require("../models/Students");

//Upload quiz
module.exports.uploadQuiz = asyncHandler(async (req, res) => {
  const { title, description, quizId, deadline, courseName, questions} = req.body;
  console.log("uploading quiz:", deadline);

  const teacher = await Teacher.findById(req.teacher._id);

  //Creating new quiz

  const newQuiz = new Quizes({
    givenBy: req.teacher._id,
    title,
    description,
    quizId,
    deadline,
    courseName,
    questions,
    uploadDate: Date.now(),
  });

  const saveQuiz = await newQuiz.save();

  console.log(saveQuiz, "uploaded Quiz");

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    {
      _id: teacher._id,
    },
    {
      $push: {
        quizes: saveQuiz._id,
      },
    },
    {
      runValidators: true,
      new: true,
    }
  ).populate("quizes");

  console.log(updatedTeacher, "savedTeacher");

  //Saving quizes in each students document
  const students = await Student.find({});

  for (let i = 0; i < students.length; i++) {
    students[i].quizes.push(saveQuiz._id);

    const savedStudent = await students[i].save();

    console.log(savedStudent, "savedStudent");
  }

  sendResponse(updatedTeacher, "quiz uploaded", res);
});

//Get all quizes of teachers and quizes submitted by students
module.exports.getTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById({
    _id: req.teacher._id,
  })
    .populate({
      path: "quizes",
      populate: {
        path: "quizesSubmitted.givenBy",
      },
    })
    .populate("courses");

  console.log(teacher, "teacher");

  sendResponse(teacher, "teacher data fetched successfully", res);
});

module.exports.makeCourse = asyncHandler(async (req, res) => {
  const { title, description, courseId } = req.body;

  //Creating a new course
  const newCourse = new Courses({
    title,
    description,
    courseId,
    uploadDate: Date.now(),
    givenBy: req.teacher._id,
  });

  const savedCourse = await newCourse.save();

  //Saving course in teacher's collection
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    {
      _id: req.teacher._id,
    },
    {
      $push: {
        courses: savedCourse._id,
      },
    },
    {
      runValidators: true,
      new: true,
    }
  ).populate("courses");

  console.log(updatedTeacher, "updated teacher");

  //Saving courses in each students document
  const students = await Student.find({});

  for (let i = 0; i < students.length; i++) {
    students[i].courses.push(savedCourse._id);

    const savedStudent = await students[i].save();

    console.log(savedStudent, "savedStudent");
  }

  sendResponse(updatedTeacher, "course added successfully", res);
});
