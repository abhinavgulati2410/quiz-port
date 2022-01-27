const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const quizesSchema = new schema({
  givenBy: {
    type: ObjectId,
    ref: "Teacher",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  quizId: {
    type: String,
  },
  uploadDate: {
    type: Date,
  },
  deadline: {
    type: Date,
  },
  courseName: {
    type: String,
  },
  questions: [
    {
      question: {
        type: String,
      },
      option1: {
        type: String,
      },
      option2: {
        type: String,
      },
      option3: {
        type: String,
      },
      option4: {
        type: String,
      },
      answer: {
        type: Number,
      }
    }
  ],
  quizesSubmitted: [
    {
      givenBy: {
        type: Number,
        ref: "Student",
      },
      quiz: {
        type: String,
      },
      dateSubmitted: {
        type: Date,
      },
    },
  ],
});

const Quizes = mongoose.model("Quizes", quizesSchema);
module.exports = Quizes;
