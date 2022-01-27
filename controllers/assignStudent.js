const Teacher = require("../models/Teachers");
const asyncHandler = require("../middlewares/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const Student = require("../models/Students");
const Quizes = require("../models/Quizes");

module.exports.submitQuiz = asyncHandler(async (req, res) => {
  const { quiz, quizId } = req.body;

  //Uploading work for a particular assignment
  const updatedQuiz = await Quizes.findByIdAndUpdate(
    {
      _id: quizId,
    },
    {
      $push: {
        quizesSubmitted: {
          givenBy: req.student._id,
          quiz,
          dateSubmitted: Date.now(),
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(updatedQuiz, "LOL");

  sendResponse(updatedQuiz, "quiz submitted", res);
});

module.exports.getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById({
    _id: req.student._id,
  })
    .populate({
      path: "quizes",
      populate: {
        path: "givenBy",
      },
    })
    .populate({
      path: "courses",
      populate: {
        path: "givenBy",
      },
    });

  console.log(student, "student");

  sendResponse(student, "student data fetched successfully", res);
});

module.exports.getQuiz = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log("quiz id:", id);
  const quiz = await Quizes.findById(id);
  console.log(quiz);
  // const quizwoans = quiz.map(
  //   ({ question, option1, option2, option3, option4 }) => ({
  //     question,
  //     option1,
  //     option2,
  //     option3,
  //     option4,
  //   })
  // );

  sendResponse(quiz, "Quiz fetched w/o ans", res);
});

module.exports.getCourses = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id).populate(
    "courses.courseBy",
    ["_id", "name"]
  );

  sendResponse(student, "Courses fetched", res);
});
